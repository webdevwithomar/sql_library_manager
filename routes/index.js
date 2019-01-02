const express = require('express');
const router = express.Router();

// Routes
router.get('/books', (req, res) => {
  res.render('index');
});

router.get('/books/:id', (req, res) => {
  res.render('project', {

  });
});

router.get('/', (req, res) => {
  res.redirect('/books');
});

router.get('/books/new', (req, res) => {
  res.render('new_book');
});

module.exports = router;