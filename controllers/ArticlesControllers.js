const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

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

module.exports = router;
