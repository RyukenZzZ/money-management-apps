import * as authService from "../services/auth.js";
import { successResponse } from "../utils/response.js";

export const register = async (req, res) => {
    const data = await authService.register(req.body, req.files);
    successResponse(res, data, "Registration successful");
};

export const login = async (req, res) => {
    const data = await authService.login(req.body.email, req.body.password);
    successResponse(res, data, "Login successful");
};

export const googleLogin = async (req, res) => {
    const data = await authService.googleLogin(req.body.access_token);
    successResponse(res, data, "Google login successful");
};

export const getProfile = async (req, res) => {
    const data = req.user;
    delete data.password;
    successResponse(res, data);
};

export const verifyOTP = async (req, res) => {
    const data = await authService.verifyOTP(req.user.id, req.body.otp);
    successResponse(res, data, "OTP verified successfully");
};

export const resendOTP = async (req, res) => {
    const data = await authService.resendOTP(req.user.id, req.user.email);
    successResponse(res, data, "OTP resent successfully");
};
