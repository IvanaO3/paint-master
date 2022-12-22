const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const url = require("url");
var cors = require("cors");
let sql;
const db = new sqlite3.Database("./db/db.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

app.use(bodyParser.json());
app.use(cors());

app.post("/reg", (req, res) => {
  try {
    const { firstname, lastname, password, emaill, username } = req.body;
    sql = `INSERT INTO users(firstname, lastname, username, emaill, password) VALUES (?,?,?,?,?)`;
    db.run(sql, [firstname, lastname, username, emaill, password], (err) => {
      if (err)
        return res.status(300).json({ success: false, error: err.message });
      return res.status(200).json({ success: true });
    });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
});

app.post("/log", (req, res) => {
  try {
    const { username, password } = req.body;
    sql = `SELECT * FROM users WHERE username = '${username}' and password = '${password}'`;
    db.all(sql, [], (err, rows) => {
      if (err || rows.length <= 0)
        return res.status(300).json({
          success: false,
          error: "Yoou are not registred to Paint Master",
        });
      console.log(rows);
      return res.status(200).json({ data: rows, success: true });
    });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
});

app.post("/arts", (req, res) => {
  try {
    const { image, author } = req.body;
    sql = `INSERT INTO arts(image, author) VALUES (?,?)`;
    db.run(sql, [image, author], (err) => {
      if (err)
        return res.status(300).json({ success: false, error: err.message });
      return res.status(200).json({ success: true });
    });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
});

app.get("/arts", (req, res) => {
  sql = "SELECT * FROM arts";
  try {
    db.all(sql, [], (err, rows) => {
      if (err)
        return res.status(300).json({ success: false, error: err.message });
      if (rows.length < 1)
        return res
          .status(300)
          .json({ success: false, error: "No matching element" });

      return res.status(200).json({ data: rows, success: true });
    });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
});

app.listen(1337, () => console.log("server is running on port 1337"));
