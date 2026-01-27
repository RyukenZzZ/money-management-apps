import * as categoryService from "../services/categories.js"
import { successResponse } from "../utils/response.js"

export const getCategories = async (req, res) => {
    const data = await categoryService.getCategories(req.query?.name);
    successResponse(res, data);
}

export const getCategoryById = async (req, res) => {
    const data = await categoryService.getCategoryById(req.params.id);
    successResponse(res, data);
}

export const createCategory = async (req, res) => {
    const userId = req.user.id;
    req.body.user_id = userId;
    const data = await categoryService.createCategory(req.body);
    successResponse(res, data, "Category created successfully");
};

export const updateCategoryById = async (req, res) => {
    const data = await categoryService.updateCategoryById(req.params.id, req.body);
    successResponse(res, data, "Category updated successfully");
};

export const deleteCategoryById = async (req, res) => {
    const data = await categoryService.deleteCategoryById(req.params.id);
    successResponse(res, data, "Category deleted successfully");
};