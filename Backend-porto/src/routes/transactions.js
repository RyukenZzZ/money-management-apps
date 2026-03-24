import express from "express"
import {
    validateGetTransaction,
    validateGetTransactionById,
    validateCreateTransaction,
    validateUpdateTransactionById,
    validateDeleteTransactionById,
} from "../middlewares/transactions.js"
import { authorization } from "../middlewares/auth.js"
import {
    getTransactions,
    getTransactionById,
    createTransaction,
    updateTransactionById,
    deleteTransactionById,
} from "../controllers/transactions.js"

const router = express.Router();

router.get("/", authorization, validateGetTransaction, getTransactions);
router.get("/:id", authorization, validateGetTransactionById, getTransactionById);
router.post("/", authorization, validateCreateTransaction, createTransaction);
router.put("/:id", authorization, validateUpdateTransactionById, updateTransactionById);
router.delete("/:id", authorization, validateDeleteTransactionById, deleteTransactionById);

export default router;