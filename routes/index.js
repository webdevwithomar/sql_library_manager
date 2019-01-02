const express = require('express');
const app = express();
const router = express.Router();
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const Book = require('../models').Books;

app.use(bodyParser.urlencoded({ extended: false }));

// Routes
router.get('/books', (req, res, next) => {
  Books.findAll({
    order: [['id', 'ASC']]
  })
    .then(books => {
      const booksPerPage = 10;
      const numberOfPages = Math.ceil(books.length / booksPerPage);
      const activePage = req.query.page;
      let totalBooks = [];

      while (books.length > 0) {
        totalBooks.push(books.splice(0, booksPerPage));
      }

      if (typeof currentPage === 'undefined') {
        currentPage = 0;
      }

      res.render('book-list', {
        books: totalBooks[activePage],
        pages: numberOfPages
      });
    });
});

// Redirecting the root route to books
router.get('/', (req, res) => {
  res.redirect('/books');
});

// Posting new book


// router.get('/books/new', (req, res, next) => {
//   res.render('new_book');
// });

// Getting indiviudal books
router.get('/books/:id', (req, res, next) => {
  Books.findById(req.params.id).then((book) => {
    res.render('/books/show', { title: title, author: author, genre: genre, year: year });
  });
});

module.exports = router;