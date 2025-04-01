const { Client } = require("pg");

const connection = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "root",
  database: "testdb",
});

connection.connect().then(() => console.log("Connected Succefully!"));
