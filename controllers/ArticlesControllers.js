const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Article = require("../models/Article");
const slugify = require("slugify");

// Rota para listar artigos
router.get("/admin/articles", (req, res) => {
  Article.findAll({
    include: [{ model: Category }],
  })
    .then((articles) => {
      res.render("admin/articles/index", { articles: articles });
    })
    .catch((error) => {
      console.error("Erro ao buscar artigos:", error);
      res.redirect("/admin");
    });
});

// Rota para exibir o formulário de criação de um novo artigo
router.get("/admin/articles/new", (req, res) => {
  Category.findAll()
    .then((categories) => {
      res.render("admin/articles/new", { categories: categories });
    })
    .catch((error) => {
      console.error("Erro ao carregar categorias:", error);
      res.redirect("/admin/articles");
    });
});

// Rota para salvar o artigo
router.post("/admin/articles/save", (req, res) => {
  console.log("Dados recebidos do formulário:", req.body);
  const title = req.body.title;
  const body = req.body.body;
  const category = req.body.category;

  if (!title || !body || !category) {
    console.error("Campos obrigatórios não preenchidos.");
    return res.redirect("/admin/articles/new");
  }

  Article.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: category,
  })
    .then(() => {
      console.log("Artigo criado com sucesso!");
      res.redirect("/admin/articles");
    })
    .catch((error) => {
      console.error("Erro ao salvar o artigo:", error);
      res.redirect("/admin/articles/new");
    });
});

module.exports = router;
