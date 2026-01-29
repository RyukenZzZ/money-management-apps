import express from "express";
import {
    validateGetBudgets,
    validateGetBudgetById,
    validateCreateBudget,
    validateUpdateBudgetById,
    validateDeleteBudgetById,
} from "../middlewares/budgets.js";

import {
    getBudgets,
    getBudgetById,
    createBudget,
    updateBudgetById,
    deleteBudgetById,
} from "../controllers/budgets.js";
import {authorization} from "../middlewares/auth.js"

const router = express.Router();

router.get("/", authorization, validateGetBudgets, getBudgets);
router.get("/:id", authorization, validateGetBudgetById, getBudgetById);
router.post("/", authorization, validateCreateBudget, createBudget);
router.put("/:id", authorization, validateUpdateBudgetById, updateBudgetById);
router.delete("/:id", authorization, validateDeleteBudgetById, deleteBudgetById);

export default router;