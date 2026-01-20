import { z } from "zod";
import jwt from "jsonwebtoken";

import {
  BadRequestError,
  Forbidden,
  Unauthorized,
} from "../utils/request.js";

import userRepository from "../repositories/users.js";

/* ===================== AUTHORIZATION ===================== */
export const authorization = async (req, res, next) => {
  // get token from request headers
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    throw new Unauthorized("Authentication Required!");
  }

  const splittedAuthHeader = authorizationHeader.split(" ");
  if (splittedAuthHeader.length !== 2) {
    throw new Unauthorized("Token is not valid");
  }

  const token = splittedAuthHeader[1];

  // verify token
  const extractedToken = jwt.verify(token, process.env.JWT_SECRET);

  // get user by token payload
  const user = await userRepository.getUserById(extractedToken.user_id);
  if (!user) {
    throw new Forbidden("Access Denied");
  }

  req.user = user;
  next();
};

/* ===================== VALIDATE REGISTER ===================== */
export const validateRegister = (req, res, next) => {
  const validateBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const validateFile = z
    .object({
      profile_picture: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .optional()
        .nullable(),
    })
    .optional()
    .nullable();

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  const resultValidateFiles = validateFile.safeParse(req.files);
  if (!resultValidateFiles.success) {
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

/* ===================== VALIDATE LOGIN ===================== */
export const validateLogin = (req, res, next) => {
  const validateBody = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

/* ===================== VALIDATE GOOGLE LOGIN ===================== */
export const validateGoogleLogin = (req, res, next) => {
  const validateBody = z.object({
    access_token: z.string(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};
