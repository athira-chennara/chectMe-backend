// external imports
const express = require("express");

// internal imports
const { tokenVerify } = require("../middleware/authMiddleware");
const {
	createConversation,
	getAllConversations,
} = require("../controllers/conversationController");

const conversationRouter = express.Router();

conversationRouter.post(
	"/create-conversation",
	tokenVerify,
	createConversation,
);
conversationRouter.get("/all-conversation", tokenVerify, getAllConversations);

module.exports = conversationRouter;
