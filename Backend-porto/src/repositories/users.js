import bcrypt from "bcrypt";
import axios from "axios";

import{prisma} from "../utils/prisma.js";

export const createUser = async (data) => {
  // encrypt password
  data.password = await bcrypt.hash(data.password, 10);

  // create new user
  const newUser = await prisma.users.create({
    data,
  });

  return newUser;
}; 

export const activateUser = async (userId) => {
  const activateUserById = await prisma.users.update({
    where : {id:userId},
    data:{is_active:true},
  });

  return activateUserById;
}

export const getUserByEmail = async (email) => {
  return prisma.users.findFirst({
    where: { email },
  });
};

export const getUserById = async (id) => {
  return prisma.users.findFirst({
    where: { id },
  });
};

export const googleLogin = async (accessToken) => {
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
  );

  return response?.data;
};

export default {
  createUser,
  getUserByEmail,
  getUserById,
  googleLogin,
};
