const Sequelize = require("sequelize");
const sequelize = require("../index");

const Publisher = sequelize.define("publisher", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Publisher;
