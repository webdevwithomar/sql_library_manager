const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const Books = require('./models').Books;

// Init app
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

// Using static assets
app.use('/public', express.static('public'));

//body and cookie parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const mainRoute = require('./routes/books');
const booksRoute = require('./routes/index');

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

app.use((req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  if (err.status === 404) {
    res.render('404');
  } else {
    res.render('error');
  }
});

// Serving at 3000
app.listen(3000, () => {
  console.log('Listening at port 3000');
});