// external imports
const express = require("express");

// internal imports
const { getUsers, getUserById } = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.get("/all-users", getUsers);
userRouter.get("/user/:id", getUserById);

module.exports = userRouter;
