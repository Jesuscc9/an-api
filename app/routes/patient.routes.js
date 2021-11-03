const { body } = require("express-validator");

module.exports = app => {
  const patients = require("../controllers/patient.controller.js");

  //TODO Validate if image already exists in DB, and if it has a valid file extension eg .jpeg
  //TODO Validate if registered_by is actually a real user
  // Create a new Patient
  app.post("/patients", 
  body('name').isLength({ min: 2, max: 24 }).trim(), 
  body('image').isLength({ min: 2, max: 24 }),
  body('diagnosis').isIn(["positive", "negative", "uncertain"]),
  body('registered_by').isLength({min: 2, max: 24}),
  patients.create);

  // Retrieve all Patient
  app.get("/patients", patients.findAll);

  // Retrieve a single Patient with customerId
  app.get("/patients/:patientId", patients.findOne);

  // Update a Patient with patientId
  app.put("/patients/:patientId", patients.update);

  // Delete a Patient with patientId
  app.delete("/patients/:patientId", patients.delete);

  // Delete all the patients
  app.delete("/patient", patients.deleteAll);
};