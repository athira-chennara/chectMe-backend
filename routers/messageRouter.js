// external imports
const express = require("express");

// internal imports
const {
	createMessage,
	getMessageByConversation,
	getAllMessages,
} = require("../controllers/messageController");
const { tokenVerify } = require("../middleware/authMiddleware");

const messageRouter = express.Router();

messageRouter.get(
	"/get-message-by-conversation",
	tokenVerify,
	getMessageByConversation,
);
messageRouter.get("/get-all-messages", tokenVerify, getAllMessages);

messageRouter.post("/create-message", tokenVerify, createMessage);

module.exports = messageRouter;
