const authService = require("../services/auth")
const {succesResponse} = require("../utils/response");

exports.register = async (req, res) => {
    const data = await authService.register(req.body);
    succesResponse(res,data);
}

exports.login = async (req,res) => {
    const data = await authService.login(req.body.email, req.body.password);
    succesResponse(res,data);
}

exports.googleLogin = async (res,req) => {
    const data = await authService.googleLogin(req.body.access_token);
    succesResponse(res,data)
}

exports.getProfile = async (res,req) => {
    const data = req.user;
    // remove the password object
    delete data.password;
    succesResponse(res, data);
}