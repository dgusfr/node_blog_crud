const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Página de usuários
router.get("/admin/users", (req, res) => {
  User.findAll()
    .then((users) => {
      res.render("admin/users/index", { users: users });
    })
    .catch((error) => {
      console.error("Erro ao carregar usuários:", error);
      res.redirect("/");
    });
});

// Página de criação de usuário
router.get("/admin/users/create", (req, res) => {
  rres.render("admin/users/create");
});

// Rota para criar usuário
router.post("/users/create", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        User.create({
          email: email,
          password: hash,
        })
          .then(() => {
            console.log(`Usuário ${email} criado com sucesso!`);
            // Após cadastro, redirecionar para a página de login
            res.redirect("/login");
          })
          .catch((error) => {
            console.error("Erro ao criar usuário:", error);
            res.redirect("/admin/users/create");
          });
      } else {
        console.log("E-mail já cadastrado.");
        res.redirect("/admin/users/create");
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar usuário:", error);
      res.redirect("/admin/users/create");
    });
});

// Página de login
router.get("/login", (req, res) => {
  res.render("admin/users/login");
});

// Rota para autenticação
router.post("/authenticate", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        const correct = bcrypt.compareSync(password, user.password);

        if (correct) {
          req.session.user = {
            id: user.id,
            email: user.email,
          };
          console.log(`Usuário autenticado: ${email}`);
          // Redireciona para a página de administração de artigos
          res.redirect("/admin/articles");
        } else {
          console.log("Senha incorreta.");
          res.redirect("/login");
        }
      } else {
        console.log("Usuário não encontrado.");
        res.redirect("/login");
      }
    })
    .catch((error) => {
      console.error("Erro ao autenticar usuário:", error);
      res.redirect("/login");
    });
});

// Logout
router.get("/logout", (req, res) => {
  req.session.user = undefined;
  console.log("Usuário desconectado.");
  res.redirect("/");
});

module.exports = router;
