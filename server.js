const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");

app.use(cors({
  origin: "http://localhost:3000/",
}))

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/auth.routes.js")(app);
require("./app/routes/class.routes.js")(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "An Camera API endpoint" });
});

// set port, listen for requests
app.listen(3001, () => {
  console.log("Server is running on port 3001.");
});