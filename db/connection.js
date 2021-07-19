const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "N28d9337!",
  database: "employees_db",
});

module.exports = connection;
