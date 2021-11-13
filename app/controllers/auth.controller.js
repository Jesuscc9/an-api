const User = require("../models/user.model.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
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

  const salt = await bcrypt.genSalt(10);

  req.body.password = await bcrypt.hash(req.body.password, salt);


  // Create a User 
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  // Check if user already exists

  User.findByUsername(req.body.username, async (err, data) => {
    if (err) {
      if (err.type === "not_found") {

        // Save user in the database

        User.create(user, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Patient."
            });
          else res.send(data);
        });

      } else {
        res.status(500).send({
          message: "Error retrieving user with username " + req.body.username
        });
      }
    } else {
      res.status(404).send({ message: "User already exists" })
    }
  });


};

exports.signIn = (req, res) => {
  User.findByUsername(req.body.username, async (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res.status(404).send({
          message: 'Invalid credentials'
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with username " + req.body.username
        });
      }
    } else {
      const validPassword = await bcrypt.compare(req.body.password, data.password);

      if (validPassword) {
        res.send({
          message: 'sucess'
        });
      } else {
        res.status(404).send({
          message: 'Invalid credentials'
        });
      }
    }
  });
};