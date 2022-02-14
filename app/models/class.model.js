const sql = require("./db.js");

// constructor
const Class = function (classParam) {
  this.students = classParam.students;
  this.teacher_id = classParam.teacher_id;
  this.device_id = classParam.device_id;
  this.start_date = classParam.start_date;
  this.finish_date = classParam.finish_date;
};

Class.create = (newClass, result) => {
  newClass.created_at = new Date();

  sql.query("INSERT INTO classes SET ?", newClass, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, "error");
      return;
    }

    console.log("created class: ", { id: res.insertId, ...newClass });
    result(null, { id: res.insertId, ...newClass });
  });
};

Class.findById = (classId, result) => {
  sql.query(`SELECT * FROM classes WHERE id = ${classId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    res = res.map((e) => (
      { ...e, students: JSON.parse(e.students) }
    ))

    if (res.length) {
      console.log("found Class: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ type: "not_found" }, null);
  });
};


// Implement the search by student
Class.findByStudent = (image, result) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM classes WHERE image = '${image}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        reject(err)
        return;
      }
      if (res.length) {
        console.log("found Class: ", res[0]);
        resolve(res[0])
        return;
      }
      // not found Patient with the id
      resolve("not_found");
    });
  })
};

Class.getAll = result => {
  sql.query("SELECT * FROM classes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    res = res.map((e) => (
      { ...e, students: JSON.parse(e.students) }
    ))

    console.log("classes: ", res);
    result(null, res);
  });
};

Class.updateById = (id, Class, result) => {
  Class.updated_at = new Date();

  sql.query(
    "UPDATE classes SET students = ?, teacher_id = ?, device_id = ?, start_date = ?, finish_date = ?, updated_at = ? WHERE id = ?",
    [Class.students, Class.teacher_id, Class.device_id, Class.start_date, Class.finish_date, new Date(), id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ type: "not_found" }, null);
        return;
      }

      console.log("updated Class: ", { id: id, ...Class });
      result(null, { id: id, ...Class });
    }
  );
};

Class.remove = (id, result) => {
  sql.query("DELETE FROM classes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Patient with the id
      result({ type: "not_found" }, null);
      return;
    }

    console.log("deleted Patient with id: ", id);
    result(null, res);
  });
};

Class.removeAll = result => {
  sql.query("DELETE FROM classes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} classes`);
    result(null, res);
  });
};

module.exports = Class;