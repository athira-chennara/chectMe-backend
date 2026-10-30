require("./db/index");

const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json);

app.listen(3000, () => {
	console.log("App is running @ http://localhost:3000/");
});
