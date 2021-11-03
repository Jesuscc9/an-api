const sql = require("./db.js");

// constructor
const Patient = function (patient) {
  this.name = patient.name;
  this.image = patient.image;
  this.diagnosis = patient.diagnosis;
  this.registered_by = patient.registered_by;
  this.updated_by = patient.updated_by;
};

Patient.create = (newPatient, result) => {
  newPatient.created_at = new Date();

  sql.query("INSERT INTO patients SET ?", newPatient, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, "error");
      return;
    }

    console.log("created patient: ", { id: res.insertId, ...newPatient });
    result(null, { id: res.insertId, ...newPatient });
  });
};

Patient.findById = (patientId, result) => {
  sql.query(`SELECT * FROM patients WHERE id = ${patientId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Patient: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Patient with the id
    result({ type: "not_found" }, null);
  });
};

Patient.findByImage = (image, result) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM patients WHERE image = '${image}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        reject(err)
        return;
      }
      if (res.length) {
        console.log("found Patient: ", res[0]);
        resolve(res[0])
        return;
      }
      // not found Patient with the id
      resolve("not_found");
    });
  })
};

Patient.getAll = result => {
  sql.query("SELECT * FROM patients", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("patients: ", res);
    result(null, res);
  });
};

Patient.updateById = (id, patient, result) => {
  //created_at and registered_by will not be updated
  patient.updated_at = new Date();

  sql.query(
    "UPDATE patients SET name = ?, image = ?, diagnosis = ?, updated_by = ?, updated_at = ? WHERE id = ?",
    [patient.name, patient.image, patient.diagnosis, patient.updated_by, new Date(), id],
    (err, res) => {
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

      console.log("updated Patient: ", { id: id, ...patient });
      result(null, { id: id, ...patient });
    }
  );
};

Patient.remove = (id, result) => {
  sql.query("DELETE FROM patients WHERE id = ?", id, (err, res) => {
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

Patient.removeAll = result => {
  sql.query("DELETE FROM patients", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} patients`);
    result(null, res);
  });
};

module.exports = Patient;