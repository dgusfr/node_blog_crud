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

// Configurações do Express
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Conexão com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
  });

// Sincronização dos Modelos (opcional)
Article.sync({ force: false }).then(() => {
  console.log("Tabela 'articles' sincronizada com sucesso.");
});
Category.sync({ force: false }).then(() => {
  console.log("Tabela 'categories' sincronizada com sucesso.");
});

// Rotas principais
app.use("/admin", categoriesController);
app.use("/", articlesController);

// Página inicial
app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
    limit: 4,
  })
    .then((articles) => {
      Category.findAll()
        .then((categories) => {
          res.render("index", { articles: articles, categories: categories });
        })
        .catch((error) => {
          console.error("Erro ao carregar categorias:", error);
          res.redirect("/admin/categories");
        });
    })
    .catch((error) => {
      console.error("Erro ao carregar artigos:", error);
      res.redirect("/admin/articles");
    });
});

//Rota de artigos
app.get("/:slug", (req, res) => {
  const slug = req.params.slug;

  Article.findOne({
    where: { slug: slug },
  })
    .then((article) => {
      if (article) {
        Category.findAll()
          .then((categories) => {
            res.render("article", { article: article, categories: categories });
          })
          .catch((error) => {
            console.error("Erro ao carregar categorias:", error);
            res.redirect("/");
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

//Rota de Categorias
app.get("/category/:slug", (req, res) => {
  const slug = req.params.slug;

  Category.findOne({
    where: { slug: slug },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category) {
        Category.findAll()
          .then((categories) => {
            res.render("index", {
              articles: category.articles,
              categories: categories,
            });
          })
          .catch((error) => {
            console.error("Erro ao carregar categorias:", error);
            res.redirect("/");
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

// Inicialização do servidor
app.listen(3000, () => {
  console.log("O servidor está rodando na porta 3000!");
});
