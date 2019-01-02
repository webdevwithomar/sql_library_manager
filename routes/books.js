const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Book = require('../models').Book;
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

// Route
router.get('/', (req, res, next) => {
  Book.findAll({
    order: [['id', 'ASC']]
  })
    .then(books => {
      const booksPerPage = 10;
      let numberOfPages = Math.ceil(books.length / booksPerPage);
      let currentPage = req.query.page;
      let booksArray = [];


      while (books.length > 0) {
        booksArray.push(books.splice(0, booksPerPage))
      };

      if (typeof currentPage === 'undefined') {
        currentPage = 0;
      };

      res.render('book-list', {
        books: booksArray[currentPage],
        pages: numberOfPages
      })
    }).catch(err => { res.sendStatus(500) });
});

// CREATE
router.post('/', (req, res, next) => {
  Book.create(req.body).then(book => { res.redirect(`/books`) })
    .catch(err => {
      if (err.name === "SequelizeValidationError") {
        res.render('new-book', {
          book: Book.build(req.body),
          title: "New Book",
          errors: err.errors
        });
      } else {
        throw err;
      }
    }).catch(err => { res.sendStatus(500) });
});

// UPDATE
router.post('/:id', (req, res, next) => {
  Book.findByPk(req.params.id).then(book => {
    if (book) {
      return book.update(req.body)
    } else {
      res.sendStatus(404)
    };
  })
    .then(book => { res.redirect('/books') })
    .catch(function (err) {
      if (err.name === "SequelizeValidationError") {
        let book = Book.build(req.body);
        book.id = req.params.id;
        res.render('update-book', {
          book: book,
          title: "Edit Book",
          errors: err.errors
        });
      } else {
        throw err;
      };
    }).catch(err => { res.sendStatus(500) });
});

// DELETE
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

// Book Details
router.get('/:id', (req, res, next) => {
  Book.findByPk(req.params.id)
    .then(book => {
      if (book) {
        res.render('update-book', { book: book, title: book.title });
      } else {
        res.render('page-not-found');
      };
    })
    .catch(err => { res.sendStatus(500) });
});

module.exports = router;