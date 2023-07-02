const express = require("express");


const app = express();


app.get("/", (req, res) => {
  res.send("Hey baby is working!")
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});

