const express = require('express');
const path = require('path');
const Book = require('./models').Book;

// Init app
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

// Using static assets
app.use('/public', express.static('public'));

// Routes
const mainRoute = require('./routes/index');
const booksRoute = require('./routes/books');

app.use('/', mainRoute);
app.use('/books', booksRoute);

// 404 and Server Error
app.use((req, res, next) => {
  const err = new Error('Oh no ! Not Found !');
  err.status = 404;
  next(err);
});

app.use((req, res, next) => {
  const err = new Error();
  err.status = 500;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  if (err.status === 404) {
    console.log('Sorry not found !');
    res.render('page-not-found');
  } else {
    console.log('Server Error');
    res.render('error');
  }
});

// Serving at 3000
app.listen(3000, () => {
  console.log('Listening at port 3000');
});