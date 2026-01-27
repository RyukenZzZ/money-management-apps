import express from "express";
import {
    validateGetCategories,
    validateGetCategoryById,
    validateCreateCategory,
    validateUpdateCategoryById,
    validateDeleteCategoryById
} from "../middlewares/categories.js";

import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById
} from "../controllers/categories.js";

import { authorization } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authorization, validateGetCategories, getCategories);
router.get("/:id", authorization, validateGetCategoryById, getCategoryById);
router.post("/", authorization, validateCreateCategory, createCategory);
router.put("/:id", authorization, validateUpdateCategoryById, updateCategoryById);
router.delete("/:id", authorization, validateDeleteCategoryById, deleteCategoryById);

export default router;