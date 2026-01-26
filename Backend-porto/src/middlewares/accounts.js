import { z } from "zod";
import { BadRequestError } from "../utils/request.js";

export const validateGetAccount = (req, res, next) => {
  const validateQuery = z.object({
    account_name: z.string().nullable().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.message);
  }
  next();
};

export const validateGetAccountById = (req, res, next) => {
  req.params = { ...req.params, id: Number(req.params.id) };

  const validateParams = z.object({
    id: z.number(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.message);
  }

  next();
};

export const validateCreateAccount = (req, res, next) => {
  if (req.body.balance) {
    req.body.balance = parseInt(req.body.balance);
  }
  
  const validateBody = z.object({
    account_name: z.string(),
    account_type: z.string(),
    balance: z.number(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.message);
  }
  next();
};

export const validateUpdateAccount = (req, res, next) => {
  req.params = { ...req.params, id: Number(req.params.id) };
  if (req.body.balance) {
    req.body.balance = parseInt(req.body.balance);
  }

  const validateParams = z.object({
    id: z.number(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.message);
  }

  const validateBody = z
    .object({
      account_name: z.string().optional(),
      account_type: z.string().optional(),
      balance: z.number().optional(),
    });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.message);
  }

  next()
};

export const validateDeleteAccount = (req, res, next) => {
  req.params = { ...req.params, id: Number(req.params.id) };

  const validateParams = z.object({
    id: z.number(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.message);
  }

  next();
};
