import { PrismaClient } from '../generated/client'
const bcrypt = require("bcrypt");
const axios = require("axios");

const prisma = new PrismaClient();

exports.createUser = async (data) => {
    //encrypt password
    data.password = await bcrypt.hash(data.password,10);

    // create new user
    const newUser = await prisma.users.create({
        data,
    });
    return newUser;
}

exports.getUserByEmail = async (email) => {
    const user = await prisma.users.findFirst({
        where: {
            email,
        },
    });

    return user;
}

exports.getUserById = async(id) => {
    const user = await prisma.users.findFirst({
        where:{
            id,
        }
    })
    
    return user;
}

exports.gooleLogin = async(accessToken) => {
    const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
    )
    return response?.data;
}
