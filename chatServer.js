require("./db/index");

const cors = require("cors");
const express = require("express");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routers

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.listen(3000, () => {
	console.log("App is running @ http://localhost:3000/");
});
