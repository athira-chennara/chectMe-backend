// external imports
const mongoose = require("mongoose");

// internal imports
const Conversation = require("../db/models/conversationSchema");

exports.createConversation = async (req, res) => {
	try {
		// collect data from the request
		const { userId, senderId } = req.body;

		// const conversation = await Conversation.find;

		const data = mongoose.isValidObjectId(senderId);
		console.log("data -> ", data);
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal server error." });
	}
};
