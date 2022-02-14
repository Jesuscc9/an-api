const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.signUp = async (req, res) => {
  // Validate request

  const salt = await bcrypt.genSalt(10);

  req.body.password = await bcrypt.hash(req.body.password, salt);

  // Create a User 
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
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
        res.status(404).send({
          message: "User not found " + req.body.username
        });
      }
    } else {
      res.status(404).send({ message: "User already exists" })
    }
  });

};

let refreshTokens = [];

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

        const username = req.body.username;
        const user = { name: username }

        const accessToken = generateAccessToken(user);
        // refreshTokens.push(refreshToken);
        // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

        res.send({
          message: 'sucess',
          accessToken,
          // refreshToken
        });

      } else {
        res.status(404).send({
          message: 'Invalid credentials'
        });
      }
    }
  });
};

//TODO implement refresh tokens xd
exports.refreshToken = (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.status(401).send({
    message: "No token provided"
  })
  if (!refreshTokens.includes(refreshToken)) return res.status(403).send({
    message: "Invalid token"
  })

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {

  })
}

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
}