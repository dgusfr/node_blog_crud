const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define("categories", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Sincroniza o modelo com o banco de dados
Category.sync({ force: false })
  .then(() => {
    console.log("Tabela 'categories' sincronizada com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar tabela 'categories':", error);
  });

module.exports = Category;
