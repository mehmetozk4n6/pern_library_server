const express = require("express");
const router = express.Router();
const Category = require("../db/models/category");

// Get categories

router.get("/", async (req, res) => {
  try {
    const results = await Category.findAll();
    res.status(200).json({
      status: "success",
      data: {
        categories: results,
      },
    });
  } catch (err) {
    res.json({
      error: err.errors.map((error) => error.message).join("-----"),
    });
  }
});

// Get a category

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Category.findByPk(id);
    res.status(200).json({
      status: "success",
      data: {
        category: results,
      },
    });
  } catch (err) {
    res.json({
      error: err.errors.map((error) => error.message).join("-----"),
    });
  }
});

// Add a category

router.post("/", async (req, res) => {
  try {
    const results = await Category.create({
      name: req.body.name,
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

// Update a category

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Category.findByPk(id);
    if (req.body.first_name) {
      results.name = req.body.name;
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

// Delete a category

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Category.findByPk(id);
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
