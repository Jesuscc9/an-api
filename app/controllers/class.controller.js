const Class = require("../models/class.model.js");
const { validationResult } = require("express-validator");

exports.create = (req, res) => {
  // Validate request

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Patient
  const patient = new Class({
    students: JSON.stringify(req.body.students),
    teacher_id: req.body.teacher_id,
    device_id: req.body.device_id,
    start_date: req.body.start_date,
    finish_date: req.body.finish_date,
    registered_by: req.body.registered_by,
    updated_by: req.body.updated_by,
  });

  // Save Patient in the database
  Class.create(patient, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Class."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Class.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Class.findById(req.params.classId, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res.status(404).send({
          message: `Not found Class with id ${req.params.classId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Class with id " + req.params.classId
        });
      }
    } else res.send(data);
  });
};

exports.imageExists = async (image, res) => {
  try {
    const imageRes = await Class.findByImage(image);
    if (imageRes !== "not_found") return true;
    return false;
  } catch (error) {
    console.log(error)
  }
}

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Class.updateById(
    req.params.classId,
    new Class({ ...req.body, students: JSON.stringify(req.body.students) }),
    (err, data) => {
      if (err) {
        if (err.type === "not_found") {
          res.status(404).send({
            message: `Not found Class with id ${req.params.classId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Class with id " + req.params.classId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Class.remove(req.params.classId, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res.status(404).send({
          message: `Not found Class with id ${req.params.classId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Class with id " + req.params.classId
        });
      }
    } else res.send({ message: `Class was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Class.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all classes."
      });
    else res.send({ message: `All Classes were deleted successfully!` });
  });
};