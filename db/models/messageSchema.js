// external imports
const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
	{
		conversation: {
			type: mongoose.Types.ObjectId,
			ref: "Conversation",
			required: true,
		},
		message: {
			type: String,
			trim: true,
			required: true,
		},
		sender: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true },
);

// to fetch and sort messages more easy if we define index.
messageSchema.index({ conversation: 1, createdAt: 1 });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
