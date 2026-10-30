// external imports
const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
	{
		lastMessage: {
			type: mongoose.Types.ObjectId,
			ref: "Message",
			default: null,
		},
		participants: [
			{
				type: mongoose.Types.ObjectId,
				ref: "User",
				required: true,
			},
		],
	},
	{ timestamps: true },
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
