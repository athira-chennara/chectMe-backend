// internal imports
const Message = require("../db/models/messageSchema");
const Conversation = require("../db/models/conversationSchema");
const User = require("../db/models/userSchema");

// create nre message.
exports.createMessage = async (req, res) => {
	try {
		// collect data from request.
		const { id } = req.user;
		const { recipient, message } = req.body;

		// check the recipient is exist or not.
		const recipientData = await User.findById(recipient);

		// if not a valid recipient.
		if (!recipientData) {
			return res
				.status(400)
				.json({ error: true, message: "Recipient Not Found." });
		}

		// check the conversation exist or not.
		const isConversationExist = await Conversation.findOne({
			participants: {
				$all: [id, recipient],
				$size: 2,
			},
		}).populate("participants", "userName email");

		// if conversation not create new conversation.
		let newConversationData = "";
		if (!isConversationExist) {
			newConversationData = await Conversation.create({
				participants: [id, recipient],
			});
		}

		// create new message.
		const newData = await Message.create({
			conversation: isConversationExist
				? isConversationExist._id
				: newConversationData._id,
			message: message,
			sender: id,
		});

		// update the last message in conversation.
		await Conversation.findByIdAndUpdate(
			isConversationExist ? isConversationExist._id : newConversationData._id,
			{
				$set: {
					lastMessage: newData._id,
				},
			},
		);

		return res.status(201).json({ success: true, newData });
	} catch (error) {
		console.log(error);

		return res
			.status(500)
			.json({ error: true, message: "Internal Server Error." });
	}
};

// get all messages.
exports.getAllMessages = async (req, res) => {
	try {
		const messages = await Message.find();
		return res.status(200).json({ success: true, messages });
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal Server Error." });
	}
};

// get messages by conversation.
exports.getMessageByConversation = async (req, res) => {
	try {
		// collect data from request.
		const { id } = req.user;
		const { recipient } = req?.body;

		// check the conversation valid or not.
		const isConversationValid = await Conversation.findOne({
			participants: {
				$all: [id, recipient],
				$size: 2,
			},
		});

		// if conversation is not found
		if (!isConversationValid) {
			return res
				.status(400)
				.json({ error: true, message: "Invalid Conversation." });
		}

		// collect messages by conversation
		const messages = await Message.find({
			conversation: isConversationValid._id,
		}).sort({ updatedAt: -1 }); // to get the data in descending order.

		return res.status(200).json({ success: true, messages });
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal Server Error." });
	}
};
