import {prisma} from "../utils/prisma.js";

export const getCategories = async (name) => {
    const filter = {
        where: {
            AND: [
                name ? {
                    name: {
                        contains: name,
                        mode: "insensitive"
                    }
                } : {}
            ]
        },
        include: {
            categories: {
                select: {
                    id: true,
                    name: true,
                },
            }
        },
    }

    const categories = await prisma.categories.findMany(filter);
    return categories;
}

export const getCategoryById = async (id) => {
    const category = await prisma.categories.findUnique({
        where: {id:id},
        include: {
            categories:{
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    });

    return category;
}

export const createCategory = async (data) => {
    const newCategory = await prisma.categories.create({
        data:data,
    });

    return newCategory;
}

export const updateCategoryById = async (id, data) => {
    const updateCategory = await prisma.categories.update({
        where: {id:id},
        data,
    });

    return updateCategory;
}

export const deleteCategoryById = async (id) => {
    const deleteCategory = await prisma.categories.delete({
        where: {id:id},
    });

    return deleteCategory;
}
