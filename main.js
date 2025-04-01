const { Client } = require("pg");
const express = require("express");

const app = express();
app.use(express.json());

const connection = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "root",
  database: "testdb",
});

connection.connect().then(() => console.log("Connected Succefully!"));

// CREATE
app.post("/create", (req, res) => {
  const { name, id } = req.body;
  const insert_query = "INSERT INTO demotable (name, id) VALUES ($1,$2)";

  connection.query(insert_query, [name, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Created Successfully");
      console.log("Created Successfully");
    }
  });
});

// READ
app.get("/read", (req, res) => {
  const fetch_query = "SELECT * FROM demotable";

  connection.query(fetch_query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.rows);
      console.log("Fetched Successfully");
    }
  });
});

// READ by ID
app.get("/read/:id", (req, res) => {
  const id = req.params.id;
  const fetchby_query = "SELECT * FROM demotable WHERE id=$1";

  connection.query(fetchby_query, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.rows[0]);
      console.log("Fetched Successfully");
    }
  });
});

// UPDATE
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const update_query = "UPDATE demotable SET name=$1 WHERE id=$2";

  connection.query(update_query, [name, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Updated Successfully");
      console.log("Updated Successfully");
    }
  });
});

// DELETE
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const delete_query = "DELETE FROM demotable WHERE id=$1";

  connection.query(delete_query, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Deleted Successfully");
      console.log("Deleted Successfully");
    }
  });
});

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});
