const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

// Controllers
const categoriesController = require("./controllers/CategoriesController");
const articlesController = require("./controllers/ArticlesController");
const usersController = require("./controllers/UsersController");

// Models
const Article = require("./models/Article");
const Category = require("./models/Category");
const User = require("./models/User");

// Configurações
// View Engine
app.set("view engine", "ejs");

// Sessions
app.use(
  session({
    secret: "sua-chave-secreta-segura",
    cookie: { maxAge: 30000000 },
  })
);

// Arquivos Estáticos
app.use(express.static("public"));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Banco de Dados
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

// Rotas
app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

// Home Page
app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
    limit: 4,
  })
    .then((articles) => {
      Category.findAll().then((categories) => {
        res.render("index", { articles: articles, categories: categories });
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar artigos:", error);
      res.redirect("/");
    });
});

// Página do Artigo
app.get("/:slug", (req, res) => {
  const slug = req.params.slug;
  Article.findOne({ where: { slug: slug } })
    .then((article) => {
      if (article) {
        Category.findAll().then((categories) => {
          res.render("article", { article: article, categories: categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar artigo:", error);
      res.redirect("/");
    });
});

// Página de Categorias
app.get("/category/:slug", (req, res) => {
  const slug = req.params.slug;
  Category.findOne({
    where: { slug: slug },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category) {
        Category.findAll().then((categories) => {
          res.render("index", {
            articles: category.articles,
            categories: categories,
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar categoria:", error);
      res.redirect("/");
    });
});

// Inicialização do Servidor
app.listen(3000, () => {
  console.log("O servidor está rodando na porta 3000!");
});
