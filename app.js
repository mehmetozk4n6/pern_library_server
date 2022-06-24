const express = require("express");
const path = require("path");
var cors = require("cors");

// Database
const sequelize = require("./server/db");
const Bulk = require("./server/db/Bulk");
const Book = require("./server/db/models/book");

// Test DB
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("INDEX");
});

// Controllers
app.use("/books", require("./server/controllers/bookController"));
app.use("/authors", require("./server/controllers/authorController"));
app.use("/categories", require("./server/controllers/categoryController"));
app.use("/publishers", require("./server/controllers/publisherController"));

sequelize
  .sync()
  .then(() => {
    Book.count().then((count) => {
      if (count === 0) {
        Bulk();
      }
    });
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
