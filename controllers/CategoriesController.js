const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const slugify = require("slugify");

// Página para criar uma nova categoria
router.get("/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

// Rota para salvar uma nova categoria
router.post("/categories/save", (req, res) => {
  const title = req.body.title;

  if (title) {
    Category.create({
      title: title,
      slug: slugify(title),
    })
      .then(() => {
        res.redirect("/admin/categories");
      })
      .catch((error) => {
        console.error("Erro ao salvar a categoria:", error);
        res.redirect("/admin/categories/new");
      });
  } else {
    res.redirect("/admin/categories/new");
  }
});

// Rota para listar todas as categorias
router.get("/categories", (req, res) => {
  Category.findAll()
    .then((categories) => {
      res.render("admin/categories/index", { categories: categories });
    })
    .catch((error) => {
      console.error("Erro ao listar categorias:", error);
      res.redirect("/");
    });
});

// Rota para excluir uma categoria
router.post("/categories/delete", (req, res) => {
  const id = req.body.id;

  if (id && !isNaN(id)) {
    Category.destroy({
      where: { id: id },
    })
      .then(() => {
        res.redirect("/admin/categories");
      })
      .catch((error) => {
        console.error("Erro ao excluir a categoria:", error);
        res.redirect("/admin/categories");
      });
  } else {
    res.redirect("/admin/categories");
  }
});

// Rota para exibir o formulário de edição de categoria
router.get("/categories/edit/:id", async (req, res) => {
  const id = req.params.id;

  // Verifica se o ID é um número válido
  if (isNaN(id)) {
    return res.redirect("/admin/categories");
  }

  try {
    const category = await Category.findByPk(id);

    if (category) {
      res.render("admin/categories/edit", { category: category });
    } else {
      res.redirect("/admin/categories");
    }
  } catch (error) {
    console.error("Erro ao buscar a categoria:", error);
    res.redirect("/admin/categories");
  }
});

// Rota para atualizar uma categoria
router.post("/categories/update", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;

  if (id && title) {
    Category.update(
      { title: title, slug: slugify(title) },
      { where: { id: id } }
    )
      .then(() => {
        res.redirect("/admin/categories");
      })
      .catch((error) => {
        console.error("Erro ao atualizar a categoria:", error);
        res.redirect("/admin/categories");
      });
  } else {
    res.redirect("/admin/categories");
  }
});

module.exports = router;
