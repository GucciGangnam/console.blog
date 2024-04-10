var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv').config();
const mongoose = require("mongoose");
const cors = require('cors');
// Require Routers
var apiRouter = require('./routes/api');

var app = express();

// Connect to MongoDB driver //
mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@odinblogapi.zcw9koe.mongodb.net/OdinBlogAPI`;
main().catch((err) => console.error(err));
async function main() {
  try {
    await mongoose.connect(mongoDB);
    console.log('Connected to MongoDB');
    // Get the list of all collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    if (collections.length === 0) {
      console.log('No collections found in the database.');
    } else {
      console.log('Collections found:');
      collections.forEach((collection) => {
        console.log(collection.name);
      });
    }
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}
// CORS setup
const corsOptions = {
  origin: '*', // Allowed origin
  allowedHeaders: ['Authorization', 'Content-Type'], // Allowed headers
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies or other credentials to be included in CORS requests
  preflightContinue: false, // Disable preflight requests caching
  optionsSuccessStatus: 204 // Set the preflight response status code
};
app.use(cors(corsOptions));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Routes
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
