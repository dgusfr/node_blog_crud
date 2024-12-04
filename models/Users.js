const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // Garante que o e-mail seja único
    validate: {
      isEmail: true, // Verifica se é um e-mail válido
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
