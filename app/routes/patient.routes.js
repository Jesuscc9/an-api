const { body } = require("express-validator");

module.exports = app => {
  const patients = require("../controllers/patient.controller.js");

  //TODO Check if image has a valid file extension eg .jpeg
  //TODO Validate if registered_by is actually a real user in DB
  // Create a new Patient
  app.post("/patients",
    body('name', 'The name is too short or large').isLength({ min: 2, max: 24 }).trim(),
    body('image', 'The image name is not valid').custom(async (image) => {
      const imageExists = await patients.imageExists(image);
      if(imageExists) return Promise.reject("Image already exists")
      return Promise.resolve()
    }).isLength({min: 2, max: 24}),
    body('image_status', "The image_status can only be 'approved' or 'declined'").isIn(["approved", "declined"]),
    body('diagnosis', "The diagnosis can only be 'negative', 'positive' or 'uncertain'").isIn(["positive", "negative", "uncertain"]),
    body('registered_by', "The registered_by is too short or large").isLength({ min: 2, max: 24 }),
    body('updated_by', 'updated_by is not valid in a post request.').not().exists(),
    patients.create);

  // Retrieve all Patient
  app.get("/patients", patients.findAll);

  // Retrieve a single Patient with customerId
  app.get("/patients/:patientId", patients.findOne);

  // Update a Patient with patientId
  app.put("/patients/:patientId",
    body('diagnosis', "The diagnosis can only be 'negative', 'positive' or 'uncertain'").isIn(["positive", "negative", "uncertain"]),
    body('image_status', "The image_status can only be 'approved' or 'declined'").isIn(["approved", "declined"]),
    body('updated_by', "The updated_by is too short or large").isLength({ min: 2, max: 24 }),
    body('registered_by', 'registered_by is not valid in a put request.').not().exists(),
    patients.update);

  // Delete a Patient with patientId
  app.delete("/patients/:patientId", patients.delete);

  // Delete all the patients
  app.delete("/patients", patients.deleteAll);
};