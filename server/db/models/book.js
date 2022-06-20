const Sequelize = require("sequelize");
const sequelize = require("../index");

const Author = require("./author");
const Publisher = require("./publisher");
const Category = require("./category");

const Book = sequelize.define("books", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

Book.belongsTo(Publisher, {
  allowNull: false,
});
Publisher.hasMany(Book);

Book.belongsTo(Category);
Category.hasMany(Book);

Book.belongsTo(Author);
Author.hasMany(Book);

module.exports = Book;
