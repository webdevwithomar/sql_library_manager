const express = require('express');
const app = express();
const sequelize = require('sequelize');
const Op = Sequelize.Op;
const Books = require('../models').Books;

router.use(bodyParser.urlencoded({ extended: false }));

// Routes

router.get('/', (req, res, next) => {
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

// Adding new books
router.post('/:id', (req, res, next) => {
  Books.findByPk(req.params.id).then(book => {
    if (books) {
      return books.update(req.body);
    } else {
      res.sendStatus(404);
    }
  })
    .then(books => res.redirect('/books'))
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        let book = Book.build(req.body);
        book.id = req.params.id;
        res.render('update-book', {
          book: book,
          title: 'Edit Book',
          errors: err.errors
        })
      } else {
        throw err;
      }
    }).catch(err => res.sendStatus(500));
});