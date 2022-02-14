const sql = require("./db.js");

// constructor
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.role = user.role;
};

User.create = (newUser, result) => {
  newUser.created_at = new Date();
  newUser.last_connection = new Date();

  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, "error");
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByUsername = (username, result) => {
  sql.query(`SELECT * FROM users WHERE username = '${username}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ type: "not_found" }, null);
  });
};

module.exports = User;