const express = require("express");
const app = express();
const db = require('./models/index');
const { createUser, getUserById, updateUserById, deleteUserById } = require('./controllers/userController');

app.use(express.json());

//User routes
app.get("/users/:userId", getUserById);

app.post("/users/create", createUser);

app.post("/users/:userId", updateUserById);

app.delete('/users/:user_id', deleteUserById);

const PORT = 5050;

db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`Listening on PORT:${PORT}`);
  });
});