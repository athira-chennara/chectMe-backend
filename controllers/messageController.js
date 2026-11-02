const Message = require("../db/models/messageSchema");

exports.createMessage = async (req, res) => {
	try {
		// collect data from request
		const { id } = req.user;
		const { conversation, message } = req.body;

		// create new chat.
		const newData = await Message.create({
			conversation: conversation,
			message: message,
			sender: id,
		});

		return res.status(201).json({ success: true, newData });
	} catch (error) {
		console.log(error);

		return res
			.status(500)
			.json({ error: true, message: "Internal Server Error." });
	}
};
