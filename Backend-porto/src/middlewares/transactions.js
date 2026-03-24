import {z} from "zod";
import { BadRequestError } from "../utils/request.js";

export const validateGetTransaction = async (req, res, next) => {
    const valdiateQuery = z.object({
        start_date: z.string().optional(),
        end_date: z.string().optional(),
        category: z.string().optional(),
        type: z.string().optional(),
    });

    const resultValidateQuery = valdiateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        throw new BadRequestError(resultValidateQuery.error.message)
    }
    next();
}

export const validateGetTransactionById = async (req, res, next) => {
    req.params = {...req.params, id:Number(req.params.id)};

    const validateParams = z.object({
        id: z.number(),
    });

    const resultValidateParam = validateParams.safeParse(req.params);
    if (!resultValidateParam.success) {
        throw new BadRequestError(resultValidateParam.error.message)
    }

    next();
}

export const validateCreateTransaction = async (req, res, next) => {
    if(req.body.amount) {
        req.body.amount = parseInt(req.body.amount)
    }

    if(req.body.account_id) {
        req.body.account_id = parseInt(req.body.account_id)
    }

    if(req.body.category_id) {
        req.body.category_id = parseInt(req.body.category_id)
    }

    const validateBody = z.object({
        account_id: z.number(),
        category_id: z.number(),
        amount: z.number(),
        transaction_type: z.enum(["income", "expense"]),
        description: z.string().optional(),
        transaction_date: z.string().optional(),
    })

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.message)
    }
    next();
}

export const validateUpdateTransactionById = async (req, res, next) => {
    req.params.id = parseInt(req.params.id)

    if (req.body.amount) {
        req.body.amount = parseInt(req.body.amount)
    }

    if (req.body.account_id) {
        req.body.account_id = parseInt(req.body.account_id)
    }

    if (req.body.category_id) {
        req.body.category_id = parseInt(req.body.category_id)
    }

    const validateParams = z.object({
        id: z.number(),
    })

    const resultValidateParams = validateParams.safeParse(req.params)
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.success.message)
    }

    const validateBody = z.object({
        account_id: z.number().optional(),
        category_id: z.number().optional(),
        amount: z.number().optional(),
        description: z.string().optional(),
        transaction_date: z.string().optional(),
        transaction_type: z.enum(["income", "expense"]).optional(),
    })

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.message)
    }
    next();
}

export const validateDeleteTransactionById = async (req, res, next) => {
    req.params.id = parseInt(req.params.id)

    const validateParams = z.object({
        id: z.number(),
    });

    const resultValidateParam = validateParams.safeParse(req.params);
    if (!resultValidateParam.success) {
        throw new BadRequestError(resultValidateParam.error.message)
    }

    next();
}