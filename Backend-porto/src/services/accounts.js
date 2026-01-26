import * as accountRepository from "../repositories/accounts.js";
import { BadRequestError } from "../utils/request.js";

export const getAccounts = async (account_name) => {
    const accounts = await accountRepository.getAccounts(account_name);
    if (accounts.length ===0 ) {
        throw new BadRequestError("No accounts found");
    }
    
    return accounts;
};

export const getAccountById = async (id) => {
    const account = await accountRepository.getAccountById(id);
    if (!account) {
        throw new BadRequestError("Account not found");
    }
    return account;
};

export const createAccount = async (data) => {
    const newAccount = await accountRepository.createAccount(data);
    return newAccount;
};

export const updateAccountById = async (id, data) => {
    const existingAccount = await accountRepository.getAccountById(id);
    if (!existingAccount) {
        throw new BadRequestError("Account not found");
    }

    const updatedAccount = await accountRepository.updateAccountById(id, data);
    if (!updatedAccount) {
        throw new BadRequestError("Account not found or update failed");
    };
    return updatedAccount;
}

export const deleteAccountById = async (id) => {
    const existingAccount = await accountRepository.getAccountById(id);
    if (!existingAccount) {
        throw new BadRequestError("Account not found");
    }
    
    const deletedAccount = await accountRepository.deleteAccountById(id);
    if (!deletedAccount) {
        throw new BadRequestError("Account not found or delete failed");
    };
    return deletedAccount;
};