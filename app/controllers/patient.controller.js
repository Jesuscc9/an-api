const Patient = require("../models/patient.model.js");
const { validationResult } = require("express-validator");

exports.create = (req, res) => {
  // Validate request

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    }); 
  }

   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

 // Create a Patient
  const patient = new Patient({
    name: req.body.name,
    image: req.body.image,
    diagnosis: req.body.diagnosis,
    registered_by: req.body.registered_by,
    updated_by: req.body.updated_by,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  });

  // Save Patient in the database
  Patient.create(patient, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Patient."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Patient.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
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

exports.imageExist = (image, res) => {
  Patient.findByImage(image, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res.status(404).send({
          message: `Not found Patient with image ${req.params.image}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Patient with image " + req.params.image
        });
      }
    } else res.send(data);
  });
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