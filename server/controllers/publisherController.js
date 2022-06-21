const express = require("express");
const router = express.Router();
const Publisher = require("../db/models/publisher");

// Get publishers

router.get("/", async (req, res) => {
  try {
    const results = await Publisher.findAll();
    res.status(200).json({
      status: "success",
      data: {
        publishers: results,
      },
    });
  } catch (err) {
    res.json({
      error: err.errors.map((error) => error.message).join("-----"),
    });
  }
});

// Get a publisher

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Publisher.findByPk(id);
    res.status(200).json({
      status: "success",
      data: {
        publisher: results,
      },
    });
  } catch (err) {
    res.json({
      error: err.errors.map((error) => error.message).join("-----"),
    });
  }
});

// Add a publisher

router.post("/", async (req, res) => {
  try {
    const results = await Publisher.create({
      company: req.body.company,
      description: req.body.description,
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

// Update a publisher

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Publisher.findByPk(id);
    if (req.body.company) {
      results.company = req.body.company;
    }
    if (req.body.description) {
      results.description = req.body.description;
    }
    await results.save();
    res.status(200).json({
      status: "success",
      data: {
        publisher: results,
      },
    });
  } catch (err) {
    res.json({
      error: err.errors.map((error) => error.message).join("-----"),
    });
  }
});

// Delete a publisher

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Publisher.findByPk(id);
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
