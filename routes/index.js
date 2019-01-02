const express = require('express');
const app = express();
const router = express.Router();
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const Book = require('../models').Books;

app.use(bodyParser.urlencoded({ extended: false }));

// Routes
router.get('/books', (req, res, next) => {
  Books.findAll().then((books) => {
    res.render('index', { title: title, author: author, genre: genre, year: year });
  })
});

router.get('/', (req, res) => {
  res.redirect('/books');
});

router.get('/books/new', (req, res, next) => {
  res.render('new_book');
});

// Getting indiviudal books
router.get('/books/:id', (req, res, next) => {
  Books.findById(req.params.id).then((book) => {
    res.render('/books/show', { title: title, author: author, genre: genre, year: year });
  });
});

module.exports = router;