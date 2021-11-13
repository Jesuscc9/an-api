const { body } = require("express-validator");

module.exports = app => {

	const auth = require("../controllers/auth.controller.js");

	app.post("/signup",
		body('username', 'The username is too short or large').isLength({ min: 2, max: 24 }).trim(),
		body('password', 'The password is too short or large').isLength({ min: 2, max: 24 }).trim(),
		auth.signUp);

	app.post("/signin",
		body('username', 'The username is too short or large').isLength({ min: 2, max: 24 }).trim(),
		body('password', 'The password is too short or large').isLength({ min: 2, max: 24 }).trim(),
		auth.signIn);
};