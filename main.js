const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");

// Controllers
const articlesController = require("./controllers/ArticlesControllers");
const categoriesController = require("./controllers/CategoriesController");

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
app.use("/admin", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {
  res.render("index");
});

//HomePage
app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
    limit: 4,
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles: articles, categories: categories });
    });
  });
});

// Inicialização do servidor
app.listen(3000, () => {
  console.log("O servidor está rodando na porta 3000!");
});
