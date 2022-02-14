const { body, validationResult } = require("express-validator");

exports.classPostValidator = [
	body('students', 'The students is not an array').isArray(),
	// TODO: Validate that the teacher_id is a real teacher in the DB
	body('teacher_id', "The teacher_id only can be a number").isInt(),
	body('device_id', "The device_id is not valid").isIn([1, 2, 3, 4, 5]),
	body('start_date', "The start_date is not valid").isLength({ min: 2 }),
	body('finish_date', "The finish_date is not valid").isLength({ min: 2 }),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(422).json({ errors: errors.array() })
		next();
	},
]

exports.classPutValidator = [
	body('diagnosis', "The diagnosis can only be 'negative', 'positive' or 'uncertain'").isIn(["positive", "negative", "uncertain"]),
	body('image_status', "The image_status can only be 'approved' or 'declined'").isIn(["approved", "declined"]),
	body('updated_by', "The updated_by is too short or large").isLength({ min: 2, max: 24 }),
	body('registered_by', 'registered_by is not valid in a put request.').not().exists(),
	(req, res, next) => {
		next();
	},
]