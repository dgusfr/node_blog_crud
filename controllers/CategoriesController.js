const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const slugify = require("slugify");

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
      slug: slugify(title),
    }).then(() => {
      res.redirect("/");
    });
  } else {
    res.redirect("/admin/categories/new");
  }
});

router.get("/admin/categories", (req, res) => {
  res.render("admin/categories/index");
});

module.exports = router;
