import express from "express";
import authRouter from "./auth.js";
import accountRouter from "./accounts.js";
import categoryRouter from "./categories.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/accounts", accountRouter);
router.use("/categories", categoryRouter);

export default router;
