import { prisma } from "../utils/prisma.js";

export const upsertOTP = async (userId, otpHash, expiredAt) => {
    const upsertOTPById = await prisma.email_verifications.upsert({
        where:{user_id:userId},
        update:{
            verification_code:otpHash,
            expired_at:expiredAt,
            verified_at:null,
        },
        create:{
            user_id:userId,
            verification_code:otpHash,
            expired_at:expiredAt,
        },
    });

    return upsertOTPById;
}

export const findOTPByUserId = async (userId) => {
    const findOtp = await prisma.email_verifications.findUnique({
        where:{user_id:userId},
    });

    return findOtp;
};

export const markOTPVerified = async (userId) => {
  return prisma.email_verifications.update({
    where: { user_id: userId },
    data: {
      verified_at: new Date(),
    },
  });
};