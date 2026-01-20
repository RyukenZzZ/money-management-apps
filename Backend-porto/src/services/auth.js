import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import * as userRepository from "../repositories/users.js";
import * as otpRepository from "../repositories/emailVerification.js";
import { imageUpload } from "../utils/image-kit.js";
import { Unauthorized, BadRequestError } from "../utils/request.js";
import {generateOTP,hashOTP,otpExpiry} from "../utils/otp.js";
import {sendOtpEmail} from "../utils/mailer.js";


export const register = async (data, file) => {
  // if there is profile picture
  if (file?.profile_picture) {
    data.profile_picture = await imageUpload(file.profile_picture);
  }

  const exixtingUser = await userRepository.getUserByEmail(data.email);
  if(exixtingUser) {
    throw new BadRequestError("Email is already registered");
  };
  
  // create user
  const user = await userRepository.createUser(data);

  const userId = user.id;
  const otp = generateOTP();
  const otpHash = hashOTP(otp);
  const expiredAt = otpExpiry(5);

  const createOtp = await otpRepository.upsertOTP(userId, otpHash, expiredAt);
  await sendOtpEmail(user.email,otp);

  // generate token
  const token = createToken(user);

  // remove password before returning response
  delete user.password;

  return {
    user,
    token,
    createOtp,
  };
};

export const login = async (email, password) => {
  // Get user by email
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new Unauthorized("Email is Not Found !!!");
  }

  // Check password
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw new BadRequestError("Incorrect Password");
  }

  // generate token
  const token = createToken(user);

  // remove password before returning response
  delete user.password;

  return {
    user,
    token,
  };
};

export const googleLogin = async (accessToken) => {
  // get information from google
  const { email, name, picture } =
    await userRepository.googleLogin(accessToken);

  // check if user already exists
  let user = await userRepository.getUserByEmail(email);
  if (!user) {
    user = await userRepository.createUser({
      email,
      name,
      profile_picture: picture,
      password: "",
    });
  }

  // create token
  const token = createToken(user);

  // remove password before returning response
  delete user.password;

  return { user, token };
};

export const verifyOTP =async (userId, otp) => {
  const data = await otpRepository.findOTPByUserId(userId);

  if(!data) {
    throw new BadRequestError("OTP not found, please request a new one");
  }

  if(data.expired_at < new Date()) {
    throw new BadRequestError("OTP has expired, please request a new one");
  }

    const otpHash = hashOTP(otp);


    if(otpHash !== data.verification_code) {
      throw new BadRequestError("Invalid OTP");
    }

    const activateUserById = await userRepository.activateUser(userId);
    const updateVerfiedAt = await otpRepository.markOTPVerified(userId);

    return {message: "OTP verified successfully", activateUserById, updateVerfiedAt};
}

const createToken = (user) => {
  const payload = {
    user_id: user.id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "72h",
  });
};

export const resendOTP =async (userId) => {
  const user = await userRepository.getUserById(userId);
  if(!user) {
    throw new BadRequestError("User not found");
  };

  if(user.is_active) {
    throw new BadRequestError("User is already verified");
  };

  const otp = generateOTP();
  const otpHash = hashOTP(otp);
  const expiredAt = otpExpiry(5);

  const createNewOtp = await otpRepository.upsertOTP(userId, otpHash, expiredAt);
  await sendOtpEmail(user.email,otp);

  return {message: "OTP resent successfully", createNewOtp}
}