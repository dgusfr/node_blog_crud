const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

// Controllers
const articlesController = require("./controllers/ArticlesController");
const categoriesController = require("./controllers/CategoriesController");
const usersController = require("./controllers/UsersController");

// Models
const Article = require("./models/Article");
const Category = require("./models/Category");
const User = require("./models/User");

// Configurações
app.set("view engine", "ejs");

//Sessions
app.use(
  session({
    secret: "sua-chave-secreta",
    cookie: { maxAge: 30000000 },
  })
);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexão com o Banco de Dados
connection
  .authenticate()
  .then(() => console.log("Conexão feita com sucesso!"))
  .catch((error) => console.error("Erro ao conectar:", error));

// Rotas
app.use("/", articlesController);
app.use("/", categoriesController);
app.use("/", usersController);

// Home Page
app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
    limit: 4,
  })
    .then((articles) => {
      Category.findAll().then((categories) => {
        res.render("index", { articles, categories });
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar artigos:", error);
      res.redirect("/");
    });
});

// Artigo Específico
app.get("/:slug", (req, res) => {
  const slug = req.params.slug;
  Article.findOne({ where: { slug } })
    .then((article) => {
      if (article) {
        Category.findAll().then((categories) => {
          res.render("article", { article, categories });
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

// Categoria Específica
app.get("/category/:slug", (req, res) => {
  const slug = req.params.slug;
  Category.findOne({
    where: { slug },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category) {
        Category.findAll().then((categories) => {
          res.render("index", { articles: category.articles, categories });
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

// Inicialização
app.listen(3000, () => console.log("O servidor está rodando na porta 3000!"));
