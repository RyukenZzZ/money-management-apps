import crypto from "crypto";

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const hashOTP = (otp) => {
  return crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");
};

export const otpExpiry = (minutes = 5) => {
  return new Date(Date.now() + minutes * 60 * 1000); // otp will expired in 5 minutes
};
