const express = require("express");
const Author = require("../db/models/author");
const router = express.Router();
const Book = require("../db/models/book");
const Category = require("../db/models/category");
const Publisher = require("../db/models/publisher");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Get books

router.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const booksPerPage = 5;
    const totalBooks = await Book.count();
    const results = await Book.findAll({
      include: [{ model: Category }, { model: Author }, { model: Publisher }],
      offset: (page - 1) * booksPerPage,
      limit: booksPerPage,
    });

    res.status(200).json({
      status: "success",
      results: results.length,
      data: {
        books: results,
        current: page,
        pages: Math.ceil(totalBooks / booksPerPage),
        totalBooks,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get a book

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Book.findByPk(id);
    res.status(200).json({
      status: "success",
      data: {
        book: results,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Add a book

router.post("/", async (req, res) => {
  try {
    const { title, description, categoryId, publisherId, authorId } = req.body;
    const results = await Book.create({
      title,
      description,
      categoryId,
      publisherId,
      authorId,
    });
    res.status(201).json({
      status: "created",
      data: results,
    });
  } catch (err) {
    console.log(err);
  }
});

// Update a book

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, categoryId, publisherId, authorId } = req.body;
    const results = await Book.findByPk(id);
    if (title) {
      results.title = title;
    }
    if (description) {
      results.description = description;
    }
    if (categoryId) {
      results.categoryId = categoryId;
    }
    if (publisherId) {
      results.publisherId = publisherId;
    }
    if (authorId) {
      results.authorId = authorId;
    }
    await results.save();
    res.status(200).json({
      status: "success",
      data: {
        book: results,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete a book

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Book.findByPk(id);
    await results.destroy();
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/search", (req, res) => {
  const page = req.query.page || 1;
  const booksPerPage = 5;
  const { term } = req.body;
  term.toLocaleLowerCase();
  Book.findAll({ where: { title: { [Op.like]: `%${term}%` } } })
    .then((books) => res.json({ data: books }))
    .catch((err) => console.log(err));
});

module.exports = router;
