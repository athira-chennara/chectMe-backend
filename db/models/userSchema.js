const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		userName: {
			trim: true,
			unique: true,
			type: String,
			lowercase: true,
			required: [true, "Username is required"],
		},
		email: {
			trim: true,
			unique: true,
			type: String,
			lowercase: true,
			required: [true, "Email is required"],
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"], // to validate the email format
		},
		password: {
			trim: true,
			type: String,
			required: [true, "Password is required"],
			minlength: [8, "Password must be at least 8 characters"],
			select: false, // to not show in the default query fetch
		},
	},
	{ timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
