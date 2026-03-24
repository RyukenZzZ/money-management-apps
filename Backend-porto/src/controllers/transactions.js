import * as transactionService from "../services/transactions.js"
import { successResponse } from "../utils/response.js"

export const getTransactions = async (req, res) => {
    const userId = req.user.id;
    const filters = req.query;
    const data = await transactionService.getTransactions(userId,filters)
    successResponse(res, data);
}

export const getTransactionById = async (req, res) => {
    const data = await transactionService.getTransactionById(req.params.id)
    successResponse(res, data)
}

export const createTransaction = async (req, res) => {
    const userId = req.user.id;
    req.body.user_id = userId;
    const data = await transactionService.createTransaction(req.body);
    successResponse(res, data, "Create Transaction Successfuly !")
}

export const updateTransactionById = async (req, res) => {
    const data = await transactionService.updateTransactionById(req.params.id, req.body)
    successResponse(res, data, "Update Transaction Successfully !")
}

export const deleteTransactionById = async (req, res) => {
    const data = await transactionService.deleteTransactionById(req.params.id)
    successResponse(res, data, "Delete Transaction Successfully !");
}