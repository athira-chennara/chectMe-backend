// external imports
const express = require("express");

// internal imports
const { login, signUp, data } = require("../controllers/authControllers");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signUp);

module.exports = authRouter;
