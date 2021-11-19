const express = require("express");
const newConn = require("./DBConnections");

const app = express();

//static content
app.use(express.static("static"));
//dynamic handling

//login for admin
app.get("/login", (req, res) => {
  let conn = newConn();
  conn.connect();

  conn.query(`select * from SignIn`, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      let signIn = rows;
      //this will compare pass and user on db which is admin and 123
      if (
        req.query.username == signIn[0].Username &&
        req.query.password == signIn[0].Password
      )
        //this will happen if pass is correct
        res.redirect("/admin-page");
      else res.redirect("/adminSignIn.html");
    }
  });

  conn.end();
});

//This shows admin page
app.get("/admin-page", (req, res) => {
  let conn = newConn();
  conn.connect();
  //this shows times to be selected from
  conn.query("select * from Times", (err, rows, fields) => {
    let content = "";
    content += "<div style='background-color: cornflowerblue'>";
    content += `<table style = 'border: 1px solid black'>`;
    let headers = rows;
    content += "<tr>";
    content += `<th>${headers[0].Header}</th>`;
    content += `<th>${headers[0].Time1}</th>`;
    content += `<th>${headers[0].Time2}</th>`;
    content += `<th>${headers[0].Time3}</th>`;
    content += `<th>${headers[0].Time4}</th>`;
    content += `<th>${headers[0].Time5}</th>`;
    content += `<th>${headers[0].Time6}</th>`;
    content += `<th>${headers[0].Time7}</th>`;
    content += `<th>${headers[0].Time8}</th>`;
    content += `<th>${headers[0].Time9}</th>`;
    content += `<th>${headers[0].Time10}</th>`;
    content += "</tr>";
    content += "</div>";
    res.write(content);
    if (err) console.log(err);
  });

  //this shows user content, times selected and users
  conn.query("select * from Doodle", (err, rows, fields) => {
    let data = rows;
    let content = "";
    for (d of data) {
      //if stored value is true, change color to green if not it stays grey
      content += "<tr>";
      content += `<td>${d.Name}</td>`;
      content += `<td style = 'background-color: ${
        d.Time1 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time2 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time3 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time4 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time5 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time6 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time7 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time8 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time9 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time10 ? "green" : "grey"
      }'></td>`;
      content += "</tr>";
    }
    content += "</table>";
    content += "<a href='/time-change'>Click To Change Time</a>";

    res.write(content);
    res.end();
  });

  conn.end();
});

//change times forms
app.get("/time-change", (req, res) => {
  let conn = newConn();
  conn.connect();
  //this will create a page for changing times
  conn.query("select * from Times", (err, rows, fields) => {
    let content = "";
    let times = rows;

    content += "<div style='background-color: cornflowerblue'>";
    content += "<form action = '/change-time'>";
    content += `First Time Slot: <input name = 'time1' value = "${times[0].Time1}" style="margin: 5px;"/></br>`;
    content += `Second Time Slot: <input name = 'time2' value = "${times[0].Time2}" style="margin: 5px;"/></br>`;
    content += `Third Time Slot: <input name = 'time3' value = "${times[0].Time3}" style="margin: 5px;"/></br>`;
    content += `Fourth Time Slot: <input name = 'time4' value = "${times[0].Time4}" style="margin: 5px;"/></br>`;
    content += `Fifth Time Slot: <input name = 'time5' value = "${times[0].Time5}" style="margin: 5px;"/></br>`;
    content += `Sixth Time Slot: <input name = 'time6' value = "${times[0].Time6}" style="margin: 5px;"/></br>`;
    content += `Seventh Time Slot: <input name = 'time7' value = "${times[0].Time7}" style="margin: 5px;"/></br>`;
    content += `Eighth Time Slot: <input name = 'time8' value = "${times[0].Time8}" style="margin: 5px;"/></br>`;
    content += `Ninth Time Slot: <input name = 'time9' value = "${times[0].Time9}" style="margin: 5px;"/></br>`;
    content += `Tenth Time Slot: <input name = 'time10' value = "${times[0].Time10}" style="margin: 5px;"/></br>`;
    content += `<input type='submit' value = 'save'>`;
    content += "</form>";
    content += "</div>";
    res.send(content);
  });

  conn.end();
});

app.get("/change-time", (req, res) => {
  let conn = newConn();
  conn.connect();
  conn.query(`UPDATE Times set Header = 'Name'`, (err, rows, fields) => {
    if (err) console.log(err);
  });
  conn.query(
    `UPDATE Times set Time1 = "${req.query.time1}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time2 = "${req.query.time2}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time3 = "${req.query.time3}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time4 = "${req.query.time4}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time5 = "${req.query.time5}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time6 = "${req.query.time6}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time7 = "${req.query.time7}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time8 = "${req.query.time8}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time9 = "${req.query.time9}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time10 = "${req.query.time10}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
      res.redirect("/admin-page"); //redirect to admin page after
    }
  );

  conn.end();
});

//guest page
app.get("/mainPage", (req, res) => {
  let conn = newConn();
  conn.connect();
  //creating headers for tables
  conn.query("select * from Times", (err, rows, fields) => {
    let content = "";
    content += "<div style='background-color: cornflowerblue'>";
    content += `<table style = 'border: 1px solid black'>`;
    let headers = rows;
    content += "<tr>";
    content += `<th>${headers[0].Header}</th>`;
    content += `<th>${headers[0].Time1}</th>`;
    content += `<th>${headers[0].Time2}</th>`;
    content += `<th>${headers[0].Time3}</th>`;
    content += `<th>${headers[0].Time4}</th>`;
    content += `<th>${headers[0].Time5}</th>`;
    content += `<th>${headers[0].Time6}</th>`;
    content += `<th>${headers[0].Time7}</th>`;
    content += `<th>${headers[0].Time8}</th>`;
    content += `<th>${headers[0].Time9}</th>`;
    content += `<th>${headers[0].Time10}</th>`;
    content += "</tr>";
    content += "</div>";
    res.write(content);
    if (err) console.log(err);
  });

  //shows all data of users
  conn.query("select * from Doodle", (err, rows, fields) => {
    let data = rows;
    let content = "";
    for (d of data) {
      content += "<tr>";
      content += `<td>${d.Name}</td>`;
      //change color to green based on db if it is true
      content += `<td style = 'background-color: ${
        d.Time1 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time2 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time3 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time4 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time5 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time6 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time7 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time8 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time9 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time10 ? "green" : "grey"
      }'></td>`;
      content += "</tr>";
    }
    //form within the table to update from
    content += "<tr>";
    content += `<form action = '/add-data' id = 'form'>
                  <td><input name = "name"/></td>
                  <td><input type = "checkbox" name = "time1" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time2" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time3" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time4" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time5" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time6" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time7" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time8" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time9" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time10" form = 'form'/></td>
                </form>`;
    content += "</tr>";
    content += "</table>";
    content += "<input type = 'submit' value = 'save' form = 'form'/>";
    res.write(content);

    res.end();
  });

  conn.end();
});

//update values in db
app.get("/add-data", (req, res) => {
  let conn = newConn();
  conn.connect();

  conn.query(
    //if value exists it is 1 or true else it is false or 0
    `insert into Doodle values ('${req.query.name}',${
      req.query.time1 ? 1 : 0
    },'${req.query.time2 ? 1 : 0}','${req.query.time3 ? 1 : 0}','${
      req.query.time4 ? 1 : 0
    }','${req.query.time5 ? 1 : 0}','${req.query.time6 ? 1 : 0}','${
      req.query.time7 ? 1 : 0
    }','${req.query.time8 ? 1 : 0}','${req.query.time9 ? 1 : 0}','${
      req.query.time10 ? 1 : 0
    }')`,
    (err, rows, fields) => {
      res.redirect("/mainPage");
      if (err) console.log(err);
    }
  );

  conn.end();
});

app.listen(80);
