// external imports
const express = require("express");

// internal imports
const { tokenVerify } = require("../middleware/authMiddleware");
const { getUsers, getUserById } = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.get("/all-users", tokenVerify, getUsers);
userRouter.get("/user/:id", getUserById);

module.exports = userRouter;
