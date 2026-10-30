// external imports
const jwt = require("jsonwebtoken");

// secret code to generate token
const JWTSECRET = process.env.JWT_SECRET;

exports.tokenVerify = (req, res, next) => {
	try {
		// collect autherization details like token from request.
		const { authorization } = req.headers;

		// if no autherization detail found.
		if (!authorization) {
			return res
				.status(401)
				.json({ error: true, message: "You are not autherized" });
		}

		// decode token from autherization data
		const token = authorization.split(" ")[1];

		// verify the token is valid or not
		const tokenValid = jwt.verify(token, JWTSECRET);

		if (tokenValid) {
			next();
		}
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({
				isTokenExpired: true,
				error: true,
				message: "Token has expired. Please login again.",
			});
		}

		return res.status(401).json({
			error: true,
			message: "Invalid token.",
		});
	}
};
