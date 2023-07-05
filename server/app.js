const express = require("express");
const app = express();
const db = require('./models/index');
const userController = require('./controllers/userController');

app.use(express.json());

app.get("/select", (req, res) => {
  res.send("select")
});

app.post("/create", userController.createUser);

app.get("/delete", (req, res) => {
  res.send("delete")
});

const PORT = 5050;

db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`Listening on PORT:${PORT}`);
  });
});