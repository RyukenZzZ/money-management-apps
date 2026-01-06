const express = require("express");
const {
    validateRegister,
    validateLogin,
    authorization,
    validateGoogleLogin,
} = require("../middlewares/auth");
const {register, login, getProfile, googleLogin} = require("../controllers/auth");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/google/login", validateGoogleLogin, googleLogin);
router.get("/profile", authorization, getProfile);

module.exports = router;