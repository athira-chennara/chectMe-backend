// external imports
const express = require("express");

// internal imports
const { tokenVerify } = require("../middleware/authMiddleware");
const {
	createConversation,
	getAllConversations,
	updateConversationById,
} = require("../controllers/conversationController");

const conversationRouter = express.Router();

conversationRouter.get("/all-conversation", tokenVerify, getAllConversations);

conversationRouter.post(
	"/create-conversation",
	tokenVerify,
	createConversation,
);

module.exports = conversationRouter;
