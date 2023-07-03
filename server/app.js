const express = require("express");
const app = express();
const db = require('./models/index');
const { User } = require('./models/');

app.get("/select", (req, res) => {
  res.send("select")
});

app.get("/create", (req, res) => {
  User.create({
    name: "Salami",
    email: "meatstick@gmail.com",
    password: "12345",
    address: "100 real street",
    phone_number: "555-5555"
  }).catch((err) => {
    if (err) {
      console.log(err)
    }
  });
  res.send("you created");
});

app.get("/delete", (req, res) => {
  res.send("delete")
});

const PORT = 5050;

db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`Listening on PORT:${PORT}`);
  });
});