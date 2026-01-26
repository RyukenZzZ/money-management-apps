import express from "express";
import {
  validateGetAccount,
  validateGetAccountById,
  validateCreateAccount,
  validateUpdateAccount,
  validateDeleteAccount,
} from "../middlewares/accounts.js";
import {
    getAccounts,
    getAccountById, 
    createAccount, 
    updateAccountById,
    deleteAccountById,
} from "../controllers/accounts.js";
import { authorization } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",authorization, validateGetAccount, getAccounts);
router.get("/:id", authorization, validateGetAccountById, getAccountById);
router.post("/", authorization, validateCreateAccount, createAccount);
router.put("/:id", authorization, validateUpdateAccount, updateAccountById);
router.delete("/:id", authorization, validateDeleteAccount, deleteAccountById);

export default router;