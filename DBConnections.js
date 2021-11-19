const mySQL = require("mysql");
//function to create connections
function newConn() {
  let conn = mySQL.createConnection({
    host: "34.121.116.204",
    user: "root",
    password: "western1379",
    database: "lab3DB"
  });
  return conn;
}

module.exports = newConn;
