import * as budgetsService from "../services/budgets.js";
import {successResponse} from "../utils/response.js";

export const getBudgets = async (req, res, next) => {
    const data = await budgetsService.getBudgets(req.query?.category);
    successResponse(res, data);
};

export const getBudgetById = async (req, res, next) => {
    const data = await budgetsService.getBudgetsById(req.params.id);
    successResponse(res, data);
};

export const createBudget = async (req, res, next) => {
    const userId = req.user.id;
    req.body.user_id = userId;
    const data = await budgetsService.createBudget(req.body);
    successResponse(res, data, "Created budget successfully");
};

export const updateBudgetById = async (req, res, next) => {
    const userId = req.user.id;
    req.body.user_id = userId;
    const data = await budgetsService.updateBudgetById(req.params.id, req.body);
    successResponse(res, data, "Updated budget successfully");
};

export const deleteBudgetById = async (req, res, next) => {
    const data = await budgetsService.deleteBudgetById(req.params.id);
    successResponse(res, data, "Deleted budget successfully");
}