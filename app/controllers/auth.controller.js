const Patient = require("../models/patient.model.js");
const { validationResult } = require("express-validator");

exports.findUser = (req, res) => {
  Patient.findById(req.params.patientId, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res.status(404).send({
          message: `Not found Patient with id ${req.params.Patient}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Patient with id " + req.params.Patient
        });
      }
    } else res.send(data);
  });
};

exports.imageExists = async (image, res) => {
  try {
    const imageRes = await Patient.findByImage(image);
    if(imageRes !== "not_found") return true;
    return false;
  } catch (error) {
    console.log(error)
  }
}

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Patient.updateById(
    req.params.patientId,
    new Patient(req.body),
    (err, data) => {
      if (err) {
        if (err.type === "not_found") {
          res.status(404).send({
            message: `Not found Patient with id ${req.params.patientId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Patient with id " + req.params.patientId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Patient.remove(req.params.patientId, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res.status(404).send({
          message: `Not found Patient with id ${req.params.patientId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Patient with id " + req.params.patientId
        });
      }
    } else res.send({ message: `Patient was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Patient.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};