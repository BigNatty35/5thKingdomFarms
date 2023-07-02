const express = require("express");
const app = express();

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fifthkingdom',
  password: '5thKing',
  port: 5434, // Default PostgreSQL port
});


app.get("/", (req, res) => {
  res.send("Hey baby is working!")
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});

