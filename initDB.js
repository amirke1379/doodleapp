const mySQL = require("mysql");

let conn = mySQL.createConnection({
  host: "34.121.116.204",
  user: "root",
  password: "western1379",
  database: "lab3DB"
});

conn.connect();
//Drop tables for reset
conn.query(`Drop Table SignIn`, (err, rows, fields) => {
  //handle error
  if (err) console.log(err);
  else console.log("Table Dropped");
});

conn.query(`Drop Table Doodle`, (err, rows, fields) => {
  //handle error
  if (err) console.log(err);
  else console.log("Table Dropped");
});

conn.query(`Drop Table Times`, (err, rows, fields) => {
  //handle error
  if (err) console.log(err);
  else console.log("Table Dropped");
});

//table for admin sign in data
conn.query(
  `CREATE TABLE SignIn
            (
                Username varchar(100),
                Password varchar(100)
            )
            `,
  (err, rows, fields) => {
    //handle error
    if (err) console.log(err);
    else console.log("Table Created");
  }
);

//table for doodle data
conn.query(
  `CREATE TABLE Doodle
            (
                Name varchar(100),
                Time1 BOOL,
                Time2 BOOL,
                Time3 BOOL,
                Time4 BOOL,
                Time5 BOOL,
                Time6 BOOL,
                Time7 BOOL,
                Time8 BOOL,
                Time9 BOOL,
                Time10 BOOL
            )
            `,
  (err, rows, fields) => {
    //handle error
    if (err) console.log(err);
    else console.log("Table Created");
  }
);

//creating table for times to be selected from
conn.query(
  `CREATE TABLE Times
            (
                Header varchar(100),
                Time1 varchar(100),
                Time2 varchar(100),
                Time3 varchar(100),
                Time4 varchar(100),
                Time5 varchar(100),
                Time6 varchar(100),
                Time7 varchar(100),
                Time8 varchar(100),
                Time9 varchar(100),
                Time10 varchar(100)
            )
            `,
  (err, rows, fields) => {
    //handle error
    if (err) console.log(err);
    else console.log("Table Created");
  }
);

//creating admin username and password to be stored on db
conn.query(
  `
            insert into SignIn values ("admin", "123")
            `,
  (err, rows, fields) => {
    //handle error
    if (err) console.log(err);
    else console.log("Row Inserted");
  }
);

//creating initial time slots to chose from
conn.query(
  `
            insert into Times values ("Name", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30")
            `,
  (err, rows, fields) => {
    //handle error
    if (err) console.log(err);
    else console.log("Row Inserted");
  }
);

//output inputs
conn.query(`select * from SignIn `, (err, rows, fields) => {
  //handle error
  if (err) console.log(err);
  else console.log("Row Inserted");
  for (r of rows) console.log(r);
});

conn.query(`select * from Times `, (err, rows, fields) => {
  //handle error
  if (err) console.log(err);
  else console.log("Row Inserted");
  for (r of rows) console.log(r);
});

conn.query(`select * from Doodle `, (err, rows, fields) => {
  //handle error
  if (err) console.log(err);
  else console.log("Row Inserted");
  for (r of rows) console.log(r);
});

conn.end();
