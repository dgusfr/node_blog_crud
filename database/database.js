const Sequelize = require("sequelize");

const connection = new sequelize.Sequelize("blog_crud", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
