const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const articlesController = require("./controllers/ArticlesControllers");
const categoriesController = require("./controllers/CategoriesController");

const app = express();

// Configuração do template engine
app.set("view engine", "ejs");

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração de arquivos estáticos
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

//Use Controllers
app.use("/", categoriesController);
app.use("/", articlesController);

// Rotas
app.get("/", (req, res) => {
  res.render("index");
});

// Inicialização do servidor
app.listen(3000, () => {
  console.log("O servidor está rodando na porta 3000!");
});
