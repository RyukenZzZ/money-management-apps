import {prisma} from "../utils/prisma.js";

export const getBudgets = async (category) => {
  const filter = {
    where: category
      ? {
          categories: {
            name: {
              contains: category,
              mode: "insensitive",
            },
          },
        }
      : {},
    include: {
      categories: {
        select: {
          name: true,
        },
      },
    },
  };

  return prisma.budgets.findMany(filter);
};


export const getBudgetsById = async (id) => {
    const budget = await prisma.budgets.findUnique({
        where: {id:id},
        include: {
            categories: {
                select: {
                    name: true, 
                }
            }
        }
    })
    return budget;
}

export const createBudget = async (data) => {
    const newBudget = await prisma.budgets.create({
        data:data,
    });
    return newBudget;
};

export const updateBudgetById = async (id, data) => {
    const updateBudget = await prisma.budgets.update({
        where: {id:id},
        data,
    });
    return updateBudget;
}

export const deleteBudgetById = async (id) => {
    const deleteBudget =  await prisma.budgets.delete({
        where: {id:id},
    });
    return deleteBudget;
}