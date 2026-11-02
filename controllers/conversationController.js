// external imports
const mongoose = require("mongoose");

// internal imports
const User = require("../db/models/userSchema");
const Conversation = require("../db/models/conversationSchema");

// create conversation controller.
exports.createConversation = async (req, res) => {
	try {
		// collect data from the request.
		const { id } = req.user;
		const { recipient } = req.body;

		// check the recipient is exist or not.
		const recipientData = await User.findById(recipient);

		// if not a valid recipient.
		if (!recipientData) {
			return res
				.status(400)
				.json({ error: true, message: "Recipient Not Found." });
		}

		// if the recipient is user / self chat.
		if (id === recipient) {
			return res.status(400).json({
				error: true,
				message: "You cannot create a conversation with yourself.",
			});
		}

		// check the conversation exist or not.
		const isConversationExist = await Conversation.findOne({
			participants: {
				$all: [id, recipient],
				$size: 2,
			},
		}).populate("participants", "userName email");

		// if conversation exist.
		if (isConversationExist) {
			return res.status(200).json({
				success: true,
				message: "Conversation Exist.",
				conversation: isConversationExist,
			});
		}

		// if new create new conversation.
		const newData = await Conversation.create({
			participants: [id, recipient],
		});

		// fetch the detail of new conversation.
		const createdData = await Conversation.findById(newData?._id).populate(
			"participants",
			"userName email",
		);

		return res.status(201).json({
			success: true,
			message: "Conversation Created Successfully.",
			conversation: createdData,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal server error." });
	}
};

// get all conversations controller.
exports.getAllConversations = async (req, res) => {
	try {
		// collect the logged-in user
		const { id } = req.user;

		// collect all conversations of this user
		const conversations = await Conversation.find({
			participants: id,
		})
			.populate("participants", "userName email")
			.sort({ updatedAt: -1 }); // to get the data in descending order.
		return res.status(200).json({
			success: true,
			count: conversations,
			conversations: conversations,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal Server Error." });
	}
};

// update the conversation controller.
exports.updateConversationById = async (req, res) => {
	try {
		// collect data from request.
		const { id } = req.user;
		const { recipient, lastMessage } = req.body;

		const data = await Conversation.findByIdAndUpdate(
			{ participants: [id, recipient] },
			lastMessage,
			{ new: true },
		);
		console.log("data -> ", data);
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal Server Error." });
	}
};
