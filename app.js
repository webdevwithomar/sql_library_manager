const express = require('express');
const path = require('path');

// Init app
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

// Using static assets
app.use('/public', express.static('public'));

// Routes
const mainRoute = require('./routes');

app.use(mainRoute);

app.listen(3000, () => {
  console.log('Listening at port 3000');
});