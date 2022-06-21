const express = require("express");
const router = express.Router();
const Author = require("../db/models/author");

// Get authors

router.get("/", async (req, res) => {
  try {
    const results = await Author.findAll();
    res.status(200).json({
      status: "success",
      data: {
        authors: results,
      },
    });
  } catch (err) {
    res.json({
      error: err.errors.map((error) => error.message).join("-----"),
    });
  }
});

// Get a author

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Author.findByPk(id);
    res.status(200).json({
      status: "success",
      data: {
        author: results,
      },
    });
  } catch (err) {
    res.json({
      error: err.errors.map((error) => error.message).join("-----"),
    });
  }
});

// Add a author

router.post("/", async (req, res) => {
  try {
    const results = await Author.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      location: req.body.location,
    });
    res.status(200).json({
      status: "success",
      data: results,
    });
  } catch (err) {
    res.json({
      error: err.errors.map((error) => error.message).join("-----"),
    });
  }
});

// Update a author

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Author.findByPk(id);
    if (req.body.first_name) {
      results.first_name = req.body.first_name;
    }
    if (req.body.last_name) {
      results.last_name = req.body.last_name;
    }
    if (req.body.location) {
      results.location = req.body.location;
    }
    await results.save();
    res.status(200).json({
      status: "success",
      data: {
        author: results,
      },
    });
  } catch (err) {
    res.json({
      error: err.errors.map((error) => error.message).join("-----"),
    });
  }
});

// Delete a author

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Author.findByPk(id);
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

module.exports = router;
