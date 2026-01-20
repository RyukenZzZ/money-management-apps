import express from "express";

import {
  validateRegister,
  validateLogin,
  authorization,
  validateGoogleLogin,
} from "../middlewares/auth.js";

import {
  register,
  login,
  getProfile,
  googleLogin,
  verifyOTP,
  resendOTP,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/google/login", validateGoogleLogin, googleLogin);
router.get("/profile", authorization, getProfile);
router.post("/verify-otp", authorization, verifyOTP);
router.post("/resend-otp", authorization, resendOTP);

export default router;
