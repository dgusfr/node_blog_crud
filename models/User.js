const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Sincronização opcional da tabela
User.sync({ force: false }).then(() => {
  console.log("Tabela 'users' sincronizada.");
});

module.exports = User;
