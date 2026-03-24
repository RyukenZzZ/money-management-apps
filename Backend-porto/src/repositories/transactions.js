import { prisma } from "../utils/prisma.js";

export const getTransactions = async (userId, parsedFilters) => {
    const {start_date, end_date, category, type} = parsedFilters;
    
    const where = {
        user_id:userId,
    }

    if(type) {
        where.transaction_type = type
    };

    if (start_date || end_date) {
        where.transaction_date = {};

        if (start_date) {
            where.transaction_date.gte = new Date(start_date);
        }

        if (end_date) {
            where.transaction_date.lte = new Date(end_date);
        }
    }

    if(category) {
        where.categories = {
            name: {
                contains: category,
                mode: "insensitive",
            },
        };
    }
    
    const transactions = await prisma.transactions.findMany({
        where,
        include: {
            categories: {
                select: {
                    name: true
                },
            },
            accounts: {
                select: {account_name: true}
            }

        },
        orderBy: {
            transaction_date: "desc",
        }
    });

    return transactions;
}

export const getTransactionById = async (id) => {
    const transaction = await prisma.transactions.findUnique({
        where: {id:id},
        include: {
            users: {
                select: {
                    name: true,
                    profile_picture: true,
                }
            },
            accounts: {
                select: {
                    account_name: true,
                    balance: true,
                }
            },
            categories: {
                select: {
                    name: true,
                }
            }
        },
    })

    return transaction;
}

export const createTransaction = async (data) => {
    const newTransaction = await prisma.transactions.create({
        data
    })
    return newTransaction;
};

export const updateTransactionById = async (id, data) => {
    const updateTransaction = await prisma.transactions.update({
        where: {id:id},
        data,
    })

    return updateTransaction;
}

export const deleteTransactionById = async (id) => {
    const deletedtransaction = await prisma.transactions.delete({
        where: {id:id},
    })
    return deletedtransaction;
}