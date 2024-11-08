const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateRegister, validateLogin } = require("../middlewares/AuthValidation");
const { signup, login } = require("../controllers/AuthController");
const secretKey = process.env.SECRET_KEY;

router.post("/login", validateLogin, login);
router.post("/register", validateRegister, signup);
module.exports = router;
