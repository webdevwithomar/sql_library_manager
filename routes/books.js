const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const Op = sequelize.Op;
const bodyParser = require('body-parser');
const Book = require('../models').Book;

router.use(bodyParser.urlencoded({ extended: false }));

// Routes

router.get('/', (req, res, next) => {
  Book.findAll({
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

      if (typeof activePage === 'undefined') {
        activePage = 0;
      }

      res.render('index', {
        books: totalBooks[activePage],
        pages: numberOfPages
      });
    }).catch(err => res.sendStatus(500))
});

// Adding books
router.post('/', (req, res, next) => {
  Book.create(req.body).then(book => { res.redirect('/books') })
    .catch(err => {
      if (err.name === "SequelizeValidationError") {
        res.render('new_book', {
          book: Book.build(req.body),
          title: "New Book",
          errors: err.errors
        });
      } else {
        throw err;
      }
    }).catch(err => { res.sendStatus(500) });
});

// Updating books
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

// Deleting books
router.post('/:id/delete', (req, res, next) => {
  Book.findByPk(req.params.id)
    .then(book => {
      if (book) {
        return book.destroy()
      } else {
        res.sendStatus(404)
      }
    })
    .then(book => { res.redirect('/books') })
    .catch(err => { res.sendStatus(500) });
});

// Book details
router.get('/:id', (req, res, next) => {
  Book.findByPk(req.params.id)
    .then(book => {
      if (book) {
        res.render('update_book', { book: book, title: book.title });
      } else {
        res.render('404');
      };
    })
    .catch(err => { res.sendStatus(500) });
});

module.exports = router;