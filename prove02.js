const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views/includes');

const bookData = require('./views/pages/prove02-routes');

app.use(bodyParser({extended: false}));

app.use(bookData.routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));