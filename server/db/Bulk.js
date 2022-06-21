const Book = require("./models/book");
const Author = require("./models/author");
const Category = require("./models/category");
const Publisher = require("./models/publisher");

const Bulk = () => {
  Category.bulkCreate([
    { name: "Classic" },
    { name: "Sci-Fi" },
    { name: "Utopic" },
  ]);
  Author.bulkCreate([
    { first_name: "Lev", last_name: "Tolstoy", location: "Russia" },
    { first_name: "Isaac", last_name: "Asimov", location: "Russia" },
    { first_name: "George", last_name: "Orwell", location: "England" },
  ]);
  Publisher.bulkCreate([
    { company: "Is Bankasi", description: "eligible for classics" },
    { company: "Can", description: "enable to reach all genres" },
  ]);
  Book.bulkCreate([
    {
      title: "1984",
      description: "Everybody must read",
      publisherId: 1,
      authorId: 1,
      categoryId: 1,
    },
    {
      title: "Nightfall",
      description: "Not Popular",
      publisherId: 2,
      authorId: 2,
      categoryId: 2,
    },
    {
      title: "What Men Live By",
      description: "Has a lot of query about the life",
      publisherId: 2,
      authorId: 2,
      categoryId: 2,
    },
    {
      title: "The Cossacks ",
      description: "About the traditional nation in Russia",
      publisherId: 1,
      authorId: 2,
      categoryId: 1,
    },
    {
      title: "Animal Farm",
      description: "Political criticism",
      publisherId: 2,
      authorId: 3,
      categoryId: 3,
    },
  ]);
};

module.exports = Bulk;
