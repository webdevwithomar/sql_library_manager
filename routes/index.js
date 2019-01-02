const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const Op = sequelize.Op;
const Book = require('../models').Book;

// Routes

// Redirecting the root route to books
router.get('/', (req, res) => {
  res.redirect('/books');
});

router.get('/books/new', (req, res, next) => {
  res.render('new_book', { book: Books.build() });
});

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

      res.render('index', {
        books: books,
        home: true
      })
    } else {
      res.render('no-search-results')
    }
  }).catch(err => { res.send(500) });
});

module.exports = router;