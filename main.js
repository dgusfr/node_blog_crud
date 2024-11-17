const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");

// Controllers
const articlesController = require("./controllers/ArticleController");
const categoriesController = require("./controllers/CategoryController");

// Models
const Article = require("./models/Article");
const Category = require("./models/Category");

const app = express();

// Configurações
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Conexão com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso");
  })
  .catch((error) => {
    console.log("Erro ao conectar com o banco de dados:", error);
  });

// Rotas
app.use("/articles", articlesController);
app.use("/categories", categoriesController);

app.get("/", (req, res) => {
  res.render("index");
});

// Inicialização do servidor
app.listen(3000, () => {
  console.log("O servidor está rodando na porta 3000!");
});
