const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "bugDB",
});

const getAllBugs = (req, result) => {
  const tableName = "bugs";
  db.query(`SELECT * FROM ${tableName}`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      result.send(res);
    }
  });
};

const createBug = (req, result) => {
  const bugId = req.body.bugId;
  const devId = req.body.devId;
  const description = req.body.description;

  db.query(
    "INSERT INTO bugs (bugId, devId, description) VALUES (?,?,?)",
    [bugId, devId, description],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        result.send(res);
      }
    }
  );
};

const updateBug = (req, result) => {
  const bugId = req.body.bugId;
  const devId = req.body.devId;
  db.query(
    "UPDATE bugs  SET devId = ? WHERE bugId = ?",
    [devId, bugId],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        result.send(res);
      }
    }
  );
};

const deleteBug = (req, result) => {
  const bugId = req.params.bugId;
  db.query("DELETE FROM bugs WHERE bugId = ?", bugId, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      result.send(res);
    }
  });
};

module.exports = { getAllBugs, createBug, updateBug, deleteBug };
