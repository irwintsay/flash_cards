var express         = require('express'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    morgan          = require('morgan'),
    path            = require('path');

// Application, Port # and Database
var app             = express(),
    port            = process.env.PORT || 8080,
    db              = process.env.MONGODB_URI || "mongodb://localhost/flash_cards";

// Routing
var indexRouter     = require('./server/routes/index.js');
var apiCardsRouter     = require('./server/routes/api/cards-router.js');

app.use(express.static('client/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'client/public/views'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/api/cards', apiCardsRouter);

mongoose.connect(db);

app.listen(port, function() {
  console.log("Flash Cards on port: " + port);
});
