const sql = require("./db.js");

// constructor
const Patient = function(patient) {
  this.name = patient.name;
  this.image = patient.image;
  this.diagnosis = patient.diagnosis;
  this.registered_by = patient.registered_by;
  this.created_at = new Date();
};

Patient.create = (newPatient, result) => {
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
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
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
	
  sql.query(
    "UPDATE patients SET name = ?, image = ?, diagnosis = ?, updated_at = ? WHERE id = ?",
    [patient.name, patient.iamge, patient.diagnosis, new Date(), id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...patient });
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
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
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