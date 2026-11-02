// external module import
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// internal module import
const User = require("../db/models/userSchema");

// secret code to generate token
const JWTSECRET = process.env.JWT_SECRET;

// logIn controller
exports.login = async (req, res) => {
	try {
		// collect the userName,password from request
		const { userName, password } = req.body;

		// if no value in userName and password
		if (!userName || !password) {
			return res.status(400).json({
				error: true,
				message: "Username and password are required.",
			});
		}

		// collect the user from db
		const user = await User.findOne({ userName: userName }).select("+password"); // use .select("+password"); to get the password, that we unselect it in the schema.

		// if user not found
		if (!user) {
			return res.status(401).json({ error: true, message: "Invalid User." });
		}

		// check the password is match or not
		const isPasswordMatch = await bcrypt.compare(password, user.password);

		// if password doesn't match
		if (!isPasswordMatch) {
			return res
				.status(401)
				.json({ error: true, message: "Incorrect Password." });
		}

		// generate a new token
		const token = await jwt.sign({ id: user._id }, JWTSECRET, {
			expiresIn: "1d", // to exprire token in 1day.
		});

		return res.status(200).json({
			success: true,
			token: token,
			user: { userName: user.userName, email: user.email },
		});
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal server error." });
	}
};

// signUp controller
exports.signUp = async (req, res) => {
	try {
		// collect userName,email,password from request.
		const { userName, email, password } = req.body;

		// if the values are not string
		if (
			typeof userName !== "string" ||
			typeof email !== "string" ||
			typeof password !== "string"
		) {
			return res.status(400).json({
				error: true,
				message: "Invalid input.",
			});
		}

		// if no value in userName,email and password.
		if (!userName.trim() || !email.trim() || !password.trim()) {
			return res.status(400).json({
				error: true,
				message: "All fields are required.",
			});
		}

		// if the password min-length is not 8
		if (password.length < 8) {
			return res.status(400).json({
				error: true,
				message: "Password must be at least 8 characters.",
			});
		}

		const normalizedUserName = userName.trim().toLowerCase();
		const normalizedEmail = email.trim().toLowerCase();

		// check userName or email exist or not
		const user = await User.findOne({
			$or: [{ userName: normalizedUserName }, { email: normalizedEmail }],
		});

		// if the user already exist
		if (user) {
			return res
				.status(409) // use 409 becouse the conflict in the existingdata ,means data already exist.
				.json({ error: true, message: "Username or Email Already Exists." });
		}

		// encrypt the password if the user is new.
		const hashedPassword = await bcrypt.hash(password, 10);

		// create new user with encrypted password.
		const newUser = await User.create({
			userName: normalizedUserName,
			email: normalizedEmail,
			password: hashedPassword,
		});
		return res.status(201).json({
			success: true,
			user: {
				_id: newUser._id,
				userName: newUser.userName,
				email: newUser.email,
			},
		});
	} catch (error) {
		// if duplicate-key errors come
		if (error.code === 11000) {
			return res.status(409).json({
				error: true,
				message: "Username or email already exists.",
			});
		}

		return res
			.status(500)
			.json({ error: true, message: "Internal server error." });
	}
};
