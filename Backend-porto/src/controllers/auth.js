import * as authService from "../services/auth.js";
import { succesResponse } from "../utils/response.js";

export const register = async (req, res) => {
    const data = await authService.register(req.body, req.files);
    succesResponse(res, data, "Registration successful");
};

export const login = async (req, res) => {
    const data = await authService.login(req.body.email, req.body.password);
    succesResponse(res, data, "Login successful");
};

export const googleLogin = async (req, res) => {
    const data = await authService.googleLogin(req.body.access_token);
    succesResponse(res, data, "Google login successful");
};

export const getProfile = async (req, res) => {
    const data = req.user;
    delete data.password;
    succesResponse(res, data);
};

export const verifyOTP = async (req, res) => {
    const data = await authService.verifyOTP(req.user.id, req.body.otp);
    succesResponse(res, data, "OTP verified successfully");
};

export const resendOTP = async (req, res) => {
    const data = await authService.resendOTP(req.user.id, req.user.email);
    succesResponse(res, data, "OTP resent successfully");
};
