const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Article = require("../models/Article");
const slugify = require("slugify");

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
router.post("/articles/save", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const category = req.body.category;

  // Verifica se os campos obrigatórios foram preenchidos
  if (!title || !body || !category) {
    console.error("Erro: Campos obrigatórios não preenchidos.");
    return res.redirect("/admin/articles/new");
  }

  Article.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: category,
  })
    .then(() => {
      res.redirect("/admin/articles");
    })
    .catch((error) => {
      console.error("Erro ao salvar o artigo:", error);
      res.redirect("/admin/articles/new");
    });
});

module.exports = router;
