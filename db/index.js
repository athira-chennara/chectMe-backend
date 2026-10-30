const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/chatMe")
	.then(() => {
		console.log("Database connection established");
	})
	.catch((err) => {
		console.log("Error occured while db connection", err);
	});

module.exports = mongoose;
