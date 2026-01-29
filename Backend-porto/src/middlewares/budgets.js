import {z} from "zod";
import {BadRequestError} from "../utils/request.js";

export const validateGetBudgets = (req, res, next) => {
    const validateQuery = z.object({
        category: z.string().nullable().optional(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        throw new BadRequestError(resultValidateQuery.error.message);
    }
    next();
};

export const validateGetBudgetById = (req, res, next) => {
    req.params = {...req.params, id:Number(req.params.id)}

    const validateParams = z.object({
        id: z.number(),
    });

    const resultValidateBody = validateParams.safeParse(req.params);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.message);
    }
    next();
};

export const validateCreateBudget = (req, res, next) => {
    if (req.body.amount) {
        req.body.amount = parseInt(req.body.amount);
    };

    if (req.body.category_id) {
        req.body.category_id = parseInt(req.body.category_id);
    }

    const validateBody = z.object({
        amount: z.number(),
        category_id: z.number(),
        start_date: z.coerce.date().optional(),
        end_date: z.coerce.date(),
    });

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.message);
    }

    next();
};

export const validateUpdateBudgetById = (req, res, next) => {
    req.params = {...req.params, id:Number(req.params.id)};

    if (req.body.amount) {
        req.body.amount = parseInt(req.body.amount);
    };

    if (req.body.category_id) {
        req.body.category_id = parseInt(req.body.category_id);
    };

    const validateParams = z.object({
        id: z.number(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequesstError(resultValidateParams.error.message);
    }

    const validateBody = z.object({
        amount: z.number().optional(),
        category_id: z.number().optional(),
        start_date: z.coerce.date().optional(),
        end_date: z.coerce.date().optional(),
    });

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.message);
    }

    next();
};

export const validateDeleteBudgetById = (req, res, next) => {
    req.params = {...req.params, id: Number(req.params.id)};

    const validateParams = z.object({
        id: z.number(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.message);
    }

    next();
}