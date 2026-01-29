import * as budgetsRepository from "../repositories/budgets.js";
import {BadRequestError} from "../utils/request.js";

export const getBudgets = async (category) => {
    const budgets = await budgetsRepository.getBudgets(category);
    if (budgets.length === 0) {
        throw new BadRequestError("No budgets found");
    };

    return budgets;
};

export const getBudgetsById = async (id) => {
    const budget = await budgetsRepository.getBudgetsById(id);
    if (!budget) {
        throw new BadRequestError("Budget not found");
    }
    return budget;
};

export const createBudget = async (data) => {
    const newBudget = await budgetsRepository.createBudget(data);
    return newBudget;
};

export const updateBudgetById = async (id, data) => {
    const existingBudget = await budgetsRepository.getBudgetsById(id);
    if (!existingBudget) {
        throw new BadRequestError("Budget not found");
    }
    const updatedBudget = await budgetsRepository.updateBudgetById(id, data);
    return updatedBudget;
};

export const deleteBudgetById = async (id) => {
    const existingBudget = await budgetsRepository.getBudgetsById(id);
    if (!existingBudget) {
        throw new BadRequestError("Budget not found");
    }
    
    const deletedBudget = await budgetsRepository.deleteBudgetById(id);
    return deletedBudget;
}