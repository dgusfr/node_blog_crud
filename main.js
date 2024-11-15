const express = require("express");
const app = express();
const bodyParser = required("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extends: flase }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("O servidor está rodando!");
});
