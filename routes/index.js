const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Book = require('../models').Book;

// Redirect root route to books
router.get('/', (req, res, next) => {
  res.redirect('/books');
});

// Render new-book template
router.get('/books/new', (req, res, next) => {
  res.render('new-book', { book: Book.build() });
});

// Search
router.get('/books/search', (req, res) => {
  let { q } = req.query;
  Book.findAll({
    where: {
      [Op.or]: {
        title: { [Op.like]: `%${q}%` },
        author: { [Op.like]: `%${q}%` },
        genre: { [Op.like]: `%${q}%` },
        year: { [Op.like]: `%${q}%` }
      }
    }
  }).then(books => {
    if (books.length >= 1) {

      res.render('book-list', {
        books: books,
        home: true
      })
    } else {
      res.render('page-not-found')
    }
  }).catch(err => { res.send(500) });
});

module.exports = router;