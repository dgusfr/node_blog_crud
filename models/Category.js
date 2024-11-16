const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define("categories", {
  title: {
    type: Sequelize.STRING,
    ALLOWnULL: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

modules.exports = Category;
