// external imports
const express = require("express");

// internal imports
const { tokenVerify } = require("../middleware/authMiddleware");
const { createConversation } = require("../controllers/conversationController");

const conversationRouter = express.Router();

conversationRouter.post(
	"/create-conversation",
	tokenVerify,
	createConversation,
);

module.exports = conversationRouter;
