import * as transactionRepository from "../repositories/transactions.js"
import { BadRequestError } from "../utils/request.js"

export const getTransactions = async (userId, filters) => {
    const {start_date, end_date, category, type } = filters;

    const parsedFilters = {
        start_date: start_date? new Date(start_date): null,
        end_date: end_date? new Date(end_date): null,
        category,
        type,
    }
    const transactions = await transactionRepository.getTransactions(userId,parsedFilters);
    if (transactions.length === 0) {
        throw new BadRequestError("Transaction not Found with these criteria !")
    }

    return transactions;
}

export const getTransactionById = async (id) => {
    const transaction = await transactionRepository.getTransactionById(id);
    if (!transaction) {
        throw new BadRequestError("Transaction Not Found !")
    }
    return transaction;
}

export const createTransaction = async (data) => {
    const newTransaction = await transactionRepository.createTransaction(data);
    if (!newTransaction) {
        throw new BadRequestError("Failed to create Transaction !");
    }
    return newTransaction;
}

export const updateTransactionById = async (id, data) => {
    const transaction = await transactionRepository.getTransactionById(id)
    if (!transaction) {
        throw new BadRequestError("Transaction Not Found !");
    }
    
    const updatedTransaction = await transactionRepository.updateTransactionById(id, data);
    if(!updatedTransaction) {
        throw new BadRequestError("Failed to Update Transaction !")
    }
    return updatedTransaction;
}

export const deleteTransactionById = async (id) => {
    const transaction = await transactionRepository.getTransactionById(id)
    if (!transaction) {
        throw new BadRequestError("Transaction not Found !")
    }

    const deletedTransaction = await transactionRepository.deleteTransactionById(id);
    if(!deletedTransaction) {
        throw new BadRequestError("failed to delete transaction !")
    }
    return deletedTransaction;
}
