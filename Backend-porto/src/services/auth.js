const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/users");
const {imageUpload} = require("../utils/image-kit");
const { Unauthorized, BadRequestError } = require("../utils/request");
const bcrypt = require("bcrypt");


exports.register = async (data, file)=> {
    // if there are any file profile picture
    if (file?.profile_picture) {
        data.profile_picture = await imageUpload(file.profile_picture);
    }

    // create user
    const user = await userRepository.createUser(data)

    // generate token
    const payload = {
        user_id: user.id
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"72h"}) // expires in 72 jam / 3hari
    
    // dont forget to remove the password object, if not remove it will be displayed in response
    delete user.password;

    // return the user info and token
    return{
        user,
        token,
    }
}

exports.login = async(email, password) => {
    // Get User By Email
    const user = await userRepository.getUserByEmail(email);
    if(!user){
        throw new Unauthorized("Email is Not Found !!!");
    }

    // Check password 
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if(!isCorrectPassword){
        throw new BadRequestError("Incorrect Password");
    }

    // generate Token
    const token = crateToken(user);

    // don't forget to remove the password object, if not removed it will be displayed in response
    delete user.password;
    
    return{
        user,
        token,
    };
}

exports.googleLogin = async (accessToken) => {
    // get information of access token by google api
    const {email, name, picture} = await userRepository.googleLogin(accessToken);

    // check is user already have an account
    let user = await userRepository.getUserByEmail(email);
    if(!user){
        //register the User
        user = await userRepository.createUser({
            email,
            name,
            profile_picture: picture,
            password: "",
        })
    }
    // create token
    const token = createToken(user)

    // delete the password, so the password not be displayed
    delete user.password;

    return{user,token};
}

const createToken = (user) => {
    /// generate token with JWT
    const payload = {
        user_id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "72h"}); // expired in 3 days
    return token;
};