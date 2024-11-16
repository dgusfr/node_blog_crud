const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../models/Category");

const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    ALLOWnULL: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequilized.TEXT,
    allowNull: false,
  },
});

Article.belongsTo(Category);

modules.exports = Article;
