const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

// Listagem de artigos no painel administrativo
router.get("/admin/articles", adminAuth, (req, res) => {
  Article.findAll({
    include: [{ model: Category }],
  }).then((articles) => {
    res.render("admin/articles/index", { articles: articles });
  });
});

// Formulário para criar novo artigo
router.get("/admin/articles/new", adminAuth, (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", { categories: categories });
  });
});

// Salvar um novo artigo
router.post("/articles/save", adminAuth, (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const category = req.body.category;

  Article.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: category,
  }).then(() => {
    res.redirect("/admin/articles");
  });
});

// Deletar um artigo
router.post("/articles/delete", adminAuth, (req, res) => {
  const id = req.body.id;

  if (id && !isNaN(id)) {
    Article.destroy({
      where: { id: id },
    }).then(() => {
      res.redirect("/admin/articles");
    });
  } else {
    res.redirect("/admin/articles");
  }
});

// Formulário para editar um artigo
router.get("/admin/articles/edit/:id", adminAuth, (req, res) => {
  const id = req.params.id;

  Article.findByPk(id)
    .then((article) => {
      if (article) {
        Category.findAll().then((categories) => {
          res.render("admin/articles/edit", {
            categories: categories,
            article: article,
          });
        });
      } else {
        res.redirect("/admin/articles");
      }
    })
    .catch((err) => {
      res.redirect("/admin/articles");
    });
});

// Atualizar um artigo existente
router.post("/articles/update", adminAuth, (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const body = req.body.body;
  const category = req.body.category;

  Article.update(
    { title: title, body: body, categoryId: category, slug: slugify(title) },
    { where: { id: id } }
  )
    .then(() => {
      res.redirect("/admin/articles");
    })
    .catch((err) => {
      res.redirect("/admin/articles");
    });
});

// Paginação de artigos para o público geral
router.get("/articles/page/:num", (req, res) => {
  const page = req.params.num;
  const offset = isNaN(page) || page == 1 ? 0 : (parseInt(page) - 1) * 4;

  Article.findAndCountAll({
    limit: 4,
    offset: offset,
  }).then((articles) => {
    const next = offset + 4 < articles.count;

    const result = {
      page: parseInt(page),
      next: next,
      articles: articles,
    };

    Category.findAll().then((categories) => {
      res.render("admin/articles/page", {
        result: result,
        categories: categories,
      });
    });
  });
});

module.exports = router;
