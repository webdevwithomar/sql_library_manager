const express = require('express');
const app = express();
const router = express.Router();
const sequelize = require('sequelize');
const Book = require('../models').Books;

// Routes

// Redirecting the root route to books
router.get('/', (req, res) => {
  res.redirect('/books');
});

router.get('/books/new', (req, res, next) => {
  res.render('new_book', { book: Book.build() });
});

module.exports = router;