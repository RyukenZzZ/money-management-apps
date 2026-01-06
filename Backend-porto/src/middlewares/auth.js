const {z} = require("zod");
const jwt = require("jsonwebtoken");
const {BadRequestError, Forbidden, Unauthorized} = require("../utils/request");
const userRepository = require("../repositories/users");

exports.authorization = async (req, res, next) => {
            // get token from request headers
            const authorizationHeader = req.header["authorization"];
            if(!authorizationHeader){
                throw new Unauthorized("Authentication Required !");
            }

            const splittedAuthHeader = authorizationHeader.split(" ");
            if (splittedAuthHeader.length <= 1) {
                throw new Unauthorized("Token is not valid");
            }

            const token = splittedAuthHeader[1];

            // extract the token
            const extractedToken = jwt.verify(token, process.env.JWT_SECRET);

            // get information of the user that has that token
            const user = await userRepository.getUserById(extractedToken.user_id);

            req.user = user;

            next();
        }

exports.validateRegister = (req,res,next) => {
    //validation body schema
    const validateBody = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
    });

    // the file si not required
    const validateFile = z.object({
        profile_picture: z.object({
            name: z.string(),
            data: z.any(),
        }).nullable().optional(),
    }).nullable().optional();

    // validate
    const resultValidateBody = validateBody.safeParse(req.body);
    if(!resultValidateBody.success) {
        //if validation fails, return error messages
        throw new BadRequestError(resultValidateBody.error.errors);
    }

    const resultValidateFiles = validateFile.safeParse(req.files);
    if (!resultValidateFiles) {
        throw new BadRequestError(resultValidateFiles.error.errors);
    }

    next();
}

exports.validateLogin = (req,res,next) => {
    const validateBody = z.object({
        email:z.string(),
        password:z.string(),
    })

    const resultValidateBody = validateBody.safeParse(req.body);
    if(!resultValidateBody.success){
        throw new BadRequestError(resultValidateBody.error.errors);
    }


    next();
}
    

exports.validateGoogleLogin = (req, res, next) => {
    // Validation body schema
    const validateBody = z.object({
        access_token: z.string(),
    });
    // Validate
    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateBody.error.errors);
    }
    next();
};