const express = require("express");
const Author = require("../db/models/author");
const router = express.Router();
const Book = require("../db/models/book");
const Category = require("../db/models/category");
const Publisher = require("../db/models/publisher");
// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;

// Get books

router.get("/", async (req, res) => {
  try {
    const results = await Book.findAll({
      include: [{ model: Category }, { model: Author }, { model: Publisher }],
    });
    res.status(200).json({
      status: "success",
      data: {
        books: results,
      },
    });
  } catch (err) {
    res.json({
      error: err.errors.map((error) => error.message).join("-----"),
    });
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
    res.json({
      error: err.errors.map((error) => error.message).join("-----"),
    });
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
    res.json({
      error: err.errors.map((error) => error.message).join("----"),
    });
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
    res.json({
      error: err.errors.map((error) => error.message).join("-----"),
    });
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
    res.json({
      error: err.errors.map((error) => error.message).join("-----"),
    });
  }
});

// Search for books
// router.get("/search", (req, res) => {
//   const { term } = req.query;

//   term.toLocaleLowerCase();
//   Book.findAll({ where: { title: { [Op.like]: `%${term}%` } } })
//     .then((books) => res.render("/", { books }))
//     .catch((err) => console.log(err));
// });

module.exports = router;
