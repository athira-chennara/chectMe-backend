require("./db/index");
require("dotenv").config();

const cors = require("cors");
const express = require("express");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const conversationRouter = require("./routers/conversationRouter");
const messageRouter = require("./routers/messageRouter");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routers

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/message", messageRouter);
app.use("/api/conversation", conversationRouter);

app.listen(3000, () => {
	console.log("App is running @ http://localhost:3000/");
});
