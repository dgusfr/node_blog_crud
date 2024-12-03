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
  Category.findAll().then((categories) => {
    res.render("admin/categories/index", { categories: categories });
  });
});

router.post("/categories/delete", (req, res) => {
  const id = req.body.id;

  if (id && !isNaN(id)) {
    Category.destroy({
      where: {
        id: id,
      },
    })
      .then(() => {
        res.redirect("/admin/categories");
      })
      .catch((err) => {
        console.error("Erro ao deletar categoria:", err);
        res.redirect("/admin/categories");
      });
  } else {
    res.redirect("/admin/categories");
  }
});

router.get("/categories/edit/:id", (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.redirect("/admin/categories");
  }

  Category.findByPk(id)
    .then((category) => {
      if (category) {
        // Renderiza a página de edição com os dados da categoria
        res.render("admin/categories/edit", { category: category });
      } else {
        // Redireciona caso a categoria não exista
        res.redirect("/admin/categories");
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar categoria:", error);
      res.redirect("/admin/categories");
    });
});

module.exports = router;
