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

//Rota para deletar o artigo
router.post("/admin/articles/delete", (req, res) => {
  const id = req.body.id;

  if (id && !isNaN(id)) {
    Article.destroy({
      where: { id: id },
    })
      .then(() => res.redirect("/admin/articles"))
      .catch((error) => {
        console.error("Erro ao deletar o artigo:", error);
        res.redirect("/admin/articles");
      });
  } else {
    res.redirect("/admin/articles");
  }
});

//Rota de edição de artigos
router.get("/admin/articles/edit/:id", (req, res) => {
  const id = req.params.id;

  Article.findByPk(id)
    .then((article) => {
      if (article) {
        Category.findAll()
          .then((categories) => {
            res.render("admin/articles/edit", {
              categories: categories,
              article: article,
            });
          })
          .catch((error) => {
            console.error("Erro ao carregar categorias:", error);
            res.redirect("/admin/articles");
          });
      } else {
        res.redirect("/admin/articles");
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar artigo:", error);
      res.redirect("/admin/articles");
    });
});

//Rota de atualização do artigo
router.post("/articles/update", (req, res) => {
  const { id, title, body, category } = req.body;

  if (!id || !title || !body || !category) {
    console.error("Campos obrigatórios faltando na requisição.");
    return res.redirect(`/admin/articles/edit/${id}`);
  }

  Article.update(
    {
      title: title,
      body: body,
      categoryId: category,
      slug: slugify(title),
    },
    {
      where: { id: id },
    }
  )
    .then(() => {
      console.log(`Artigo ${id} atualizado com sucesso.`);
      res.redirect("/admin/articles");
    })
    .catch((err) => {
      console.error("Erro ao atualizar o artigo:", err);
      res.redirect(`/admin/articles/edit/${id}`);
    });
});

//Rota de paginação
router.get("/articles/page/:num", (req, res) => {
  const page = parseInt(req.params.num) || 1;
  const limit = 4;
  const offset = (page - 1) * limit;

  Article.findAndCountAll({
    limit: limit,
    offset: offset,
    order: [["id", "DESC"]],
  })
    .then((articles) => {
      const next = offset + limit < articles.count;

      const result = {
        page: page,
        next: next,
        articles: articles.rows, // `rows` contém os artigos
        count: articles.count, // Total de artigos
      };

      Category.findAll()
        .then((categories) => {
          res.render("admin/articles/page", {
            result: result,
            categories: categories,
          });
        })
        .catch((error) => {
          console.error("Erro ao carregar categorias:", error);
          res.redirect("/");
        });
    })
    .catch((error) => {
      console.error("Erro ao carregar artigos:", error);
      res.redirect("/");
    });
});

module.exports = router;
