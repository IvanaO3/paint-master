const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database('./db/db.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message)
})

const sql = `CREATE TABLE arts(ID INTEGER PRIMARY KEY, image, author)`

db.run(sql)