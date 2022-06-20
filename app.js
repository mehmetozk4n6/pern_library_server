const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

// Database
const sequelize = require("./server/db");

// Test DB
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("INDEX");
});

// Book routes
app.use("/books", require("./server/controllers/bookController"));

sequelize
  .sync()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
