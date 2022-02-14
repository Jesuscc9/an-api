const { body, validationResult } = require("express-validator");

exports.signginValidator = [
	body('username', 'The username is too short or large').isLength({ min: 2, max: 24 }).trim(),
	body('password', 'The password is too short or large').isLength({ min: 2, max: 24 }).trim(),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(422).json({ errors: errors.array() });
		next();
	},
]

exports.signupValidator = [
	body('username', 'The username is too short or large').isLength({ min: 2, max: 24 }).trim(),
	body('password', 'The password is too short or large').isLength({ min: 2, max: 24 }).trim(),
	body('role', 'The role is not valid, please use one of "student", or "teacher"').isIn(['student', 'teacher']),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(422).json({ errors: errors.array() });
		next();
	},
]