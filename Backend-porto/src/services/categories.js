import * as categoryRepository from "../repositories/categories.js";
import { BadRequestError } from "../utils/request.js"

export const getCategories = async (name) => {
    const categories = await categoryRepository.getCategories(name);
    if (categories.length === 0) {
        throw new BadRequestError("Category not found");
    };

    return categories;
}

export const getCategoryById = async (id) => {
    const category = await categoryRepository.getCategoryById(id);
    if (!category) {
        throw new BadRequestError("Category not found");
    };

    return category;
};

export const createCategory = async (data) => {
    const newCategory = await categoryRepository.createCategory(data);
    if (!newCategory) {
        throw new BadRequestError("Failed to create category");
    };

    return newCategory;
};

export const updateCategoryById = async (id, data) => {
    const category = await categoryRepository.getCategoryById(id);
    if (!category) {
        throw new BadRequestError("Category not found");
    }

    const updatedCategory = await categoryRepository.updateCategoryById(id, data);
    if (!updatedCategory) {
        throw new BadRequestError("Failed to update category");
    };

    return updatedCategory;
};

export const deleteCategoryById = async (id) => {
    const category = await categoryRepository.getCategoryById(id);
    if (!category) {
        throw new BadRequestError("Category not found");
    }

    const deletedCategory = await categoryRepository.deleteCategoryById(id);
    if (!deletedCategory) {
        throw new BadRequestError("Failed to delete category");
    };

    return deletedCategory;
};