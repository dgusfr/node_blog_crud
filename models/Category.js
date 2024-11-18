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

// Cria a tabela se ela ainda não existir
Category.sync({ force: false }).then(() => {
  console.log("Tabela 'categories' criada ou já existe.");
});

module.exports = Category;
