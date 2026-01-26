import { prisma } from "../utils/prisma.js";

export const getAccounts = async (account_name) => {
    const filter = {
        where: {
            AND: [
                account_name ? { 
                    account_name: { 
                        contains: account_name, 
                        mode: "insensitive" 
                    } } : {}
            ]
        },
        include: {
            users: {
                select: {
                    name: true,
                    email: true,
                    profile_picture:true,
                }
            }
        }
    }

    const accounts = await prisma.accounts.findMany(filter);
    return accounts;
};

export const getAccountById = async (id) => {
    const account = await prisma.accounts.findUnique({
        where: {id:id},
        include: {
            users: {
                select: {
                    name: true,
                    email: true,
                    profile_picture: true,
                }
            }
        }
    })

    return account;
}

export const createAccount = async (data) => {
    const newAccount = await prisma.accounts.create({
        data:data,
    });

    return newAccount;
}

export const updateAccountById = async (id, data) => {
    const updateAccount = await prisma.accounts.update({
        where: {id:id},
        data:{
            ...data,
        updated_at: new Date(),
    },
    })

    return updateAccount;
}

export const deleteAccountById = async (id) => {
    const deleteAccount = await prisma.accounts.delete({
        where: {id:id},
    });

    return deleteAccount;
}