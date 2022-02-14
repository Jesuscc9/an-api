const { classPostValidator } = require("../middlewares/validators/class");
const { authenticateToken } = require("../middlewares/validators/token");

module.exports = app => {
  const classes = require("../controllers/class.controller.js");

  app.post("/classes", authenticateToken, classPostValidator, classes.create);

  app.get("/classes", authenticateToken, classes.findAll);

  app.get("/classes/:classId", authenticateToken, classes.findOne);

  app.put("/classes/:classId", authenticateToken, classes.update);

  app.delete("/classes/:classId", authenticateToken, classes.delete);

  app.delete("/classes", authenticateToken, classes.deleteAll);
};