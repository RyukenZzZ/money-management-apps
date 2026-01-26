import express from "express";
import authRouter from "./auth.js";
import accountRouter from "./accounts.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/accounts", accountRouter);

export default router;
