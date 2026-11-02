// external imports
const express = require("express");

// internal imports
const { tokenVerify } = require("../middleware/authMiddleware");
const { createMessage } = require("../controllers/messageController");

const messageRouter = express.Router();

messageRouter.post("/create-message", tokenVerify, createMessage);

module.exports = messageRouter;
