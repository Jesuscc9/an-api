const { signginValidator, signupValidator } = require("../middlewares/validators/auth")
const { authenticateToken } = require("../middlewares/validators/token");

module.exports = app => {

	const auth = require("../controllers/auth.controller.js");

	app.post("/signin", signginValidator, auth.signIn);

	app.post("/signup", signupValidator, auth.signUp);

	app.get("/me", authenticateToken, (req, res) => {
		res.status(200).send({
			message: "ola"
		})
	});

	app.post("/token", auth.refreshToken)
};