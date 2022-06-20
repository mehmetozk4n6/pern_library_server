const express = require("express");

const router = express.Router();

const Book = require("../db/models/book");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Get books
router.get("/", async (req, res) => {
  try {
    const results = await Book.findAll({
      attributes: ["title", "description"],
    });
    console.log(results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        books: results[rows],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Add a book

router.post("/add", (req, res) => {
  let { title, description } = req.body;
  let errors = [];

  // Validate Fields
  if (!title) {
    errors.push({ text: "Please add a title" });
  }

  if (errors.length > 0) {
    res.redirect("/");
  } else {
    // Insert into table
    Book.create({
      title,
      createdAt: Date.now(),
      description,
    })
      .then((book) => res.redirect("/"))
      .catch((err) => console.log(err));
  }
});

// Search for books
router.get("/search", (req, res) => {
  const { term } = req.query;

  term.toLocaleLowerCase();
  Book.findAll({ where: { title: { [Op.like]: `%${term}%` } } })
    .then((books) => res.render("/", { books }))
    .catch((err) => console.log(err));
});

module.exports = router;
