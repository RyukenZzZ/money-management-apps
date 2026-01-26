import * as accountService from "../services/accounts.js";
import { succesResponse } from "../utils/response.js";

export const getAccounts = async (req, res) => {
    const data = await accountService.getAccounts(req.query?.account_name);
    succesResponse(res, data, "Accounts retrieved successfully");
}

export const getAccountById = async (req, res) => {
    const data = await accountService.getAccountById(req.params.id);
    succesResponse(res, data, "Account retrieved successfully");
}

export const createAccount = async (req, res) => {
    const userId = req.user.id;
    req.body.user_id = userId;
    const data = await accountService.createAccount(req.body);
    succesResponse(res, data, "Account created successfully");
};

export const updateAccountById = async (req, res) => {
    const data = await accountService.updateAccountById(req.params.id, req.body);
    succesResponse(res, data, "Account updated successfully");
};

export const deleteAccountById = async (req, res) => {
    const data = await accountService.deleteAccountById(req.params.id);
    succesResponse(res, data, "Account deleted successfully");
};