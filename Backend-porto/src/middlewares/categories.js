import {z} from "zod";
import { BadRequestError } from "../utils/request.js";

export const validateGetCategories = (req, res, next) => {
    const validateQuery = z.object({
        name: z.string().nullable().optional(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        throw new BadRequestError(resultValidateQuery.error.message);
    }
    next();
}

export const validateGetCategoryById = (req, res, next) => {
    req.params = {...req.params, id:Number(req.params.id)};

    const validateParams = z.object({
        id: z.number(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.message);
    }
    next();
}

export const validateCreateCategory = (req, res, next) => {
    if (req.body.parent_id) {
        req.body = {...req.body, parent_id: Number(req.body.parent_id)};
    }

    const validateBody = z.object({
        name: z.string(),
        category_type: z.enum(["income", "expense"]),
        parent_id: z.number().nullable().optional(),
    });

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.message);
    }
    next();
};

export const validateUpdateCategoryById = (req, res, next) => {
    req.params = {...req.params, id:Number(req.params.id)};

    if (req.body.parent_id) {
        req.body = {...req.body, parent_id: Number(req.body.parent_id)};
    }

    const validateParams = z.object({
        id: z.number(),
    })
    
    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.message);
    }

    const validateBody = z.object({
        name: z.string().optional(),
        category_type: z.enum(["income", "expense"]).optional(),
        parent_id: z.number().nullable().optional(),
    });

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.message);
    }
    next();
}

export const validateDeleteCategoryById = (req, res, next) => {
    req.params = {...req.params, id:Number(req.params.id)};

    const validateParams = z.object({
        id: z.number()
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.message);
    };
    next();
};