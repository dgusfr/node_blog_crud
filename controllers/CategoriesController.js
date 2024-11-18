const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Página de novo cadastro
router.get("/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

// Rota para salvar uma categoria
router.post("/categories/save", (req, res) => {
  const title = req.body.title;

  if (title != undefined) {
    Category.create({
      title: title,
      slug: require("slugify")(title),
    }).then(() => {
      res.redirect("/admin/categories");
    });
  } else {
    res.redirect("/admin/categories/new");
  }
});

// Rota para listar categorias
router.get("/categories", (req, res) => {
  res.render("admin/categories/index");
});

module.exports = router;
