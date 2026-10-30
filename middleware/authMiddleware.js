exports.tokenVerify = async (req, res, next) => {
	try {
		// collect autherization details like token from request.
		const { authorization } = req.headers;

		// if no autherization detail found.
		if (!authorization) {
			return res
				.status(401)
				.json({ error: true, message: "You are not autherized" });
		}
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal server error." });
	}
};
