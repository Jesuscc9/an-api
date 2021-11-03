const { body } = require("express-validator");

module.exports = app => {
  const patients = require("../controllers/patient.controller.js");
  const sql = require("../models/db.js");

  //TODO Validate if image already exists in DB, and if it has a valid file extension eg .jpeg
  //TODO Validate if registered_by is actually a real user in DB
  // Create a new Patient
  app.post("/patients",
    body('name', 'The name is too short').isLength({ min: 2, max: 24 }).trim(),

    body('image', 'The image name is too short').custom(value => {
      

      return (sql.query(`SELECT * FROM patients WHERE image = '${value}'`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          return "error"
        }
        if (res.length) {
          console.log("found Patient: ", res[0]);
          return "exists";
        }
        // not found Patient with the id
        return false;
      }) === false);
    }),


    body('diagnosis', "The diagnosis can only be 'negative', 'positive' or 'uncertain'").isIn(["positive", "negative", "uncertain"]),
    body('registered_by', "The registered_by is too short").isLength({ min: 2, max: 24 }),
    body('updated_by', 'updated_by is not valid in a post request.').not().exists(),
    patients.create);

  // Retrieve all Patient
  app.get("/patients", patients.findAll);

  // Retrieve a single Patient with customerId
  app.get("/patients/:patientId", patients.findOne);

  // Update a Patient with patientId
  app.put("/patients/:patientId",
    body('name', 'The name is too short').isLength({ min: 2, max: 24 }).trim(),
    body('image', 'The image name is too short').isLength({ min: 2, max: 24 }),
    body('diagnosis', "The diagnosis can only be 'negative', 'positive' or 'uncertain'").isIn(["positive", "negative", "uncertain"]),
    body('updated_by', "The updated_by is too short").isLength({ min: 2, max: 24 }),
    body('registered_by', 'registered_by is not valid in a put request.').not().exists(),
    patients.update);

  // Delete a Patient with patientId
  app.delete("/patients/:patientId", patients.delete);

  // Delete all the patients
  app.delete("/patients", patients.deleteAll);
};