const User = require("../db/models/userSchema");

// fetch all users
exports.getUsers = async (req, res) => {
	try {
		const users = await User.find();
		return res.status(200).json({ success: true, users });
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal server error." });
	}
};

exports.getUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findOne({ _id: id });
		return res.status(200).json({ success: true, user });
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal server error." });
	}
};
