const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const PORT = 3500;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "bugDB",
});

app.post("/create_bug", (req, result) => {
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
});

app.get("/get_bugs", (req, result) => {
  const tableName = "bugs";
  db.query(`SELECT * FROM ${tableName}`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      result.send(res);
    }
  });
});

app.put("/reassign_bug", (req, result) => {
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
});

app.delete("/delete_bug/:bugId", (req, result) => {
  const bugId = req.params.bugId;
  db.query("DELETE FROM bugs WHERE bugId = ?", bugId, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      result.send(res);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
