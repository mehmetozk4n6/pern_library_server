const Sequelize = require("sequelize");

const sequelize = new Sequelize("library", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
