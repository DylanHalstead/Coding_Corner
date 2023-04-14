require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const eventRoutes = require('./routes/eventRoutes')
const mainRoutes = require('./routes/mainRoutes')
const userRoutes = require('./routes/userRoutes')


const app = express();
const port = process.env.PORT || 3000;
const host = 'localhost';
const mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@codingcorner.wioq6cp.mongodb.net/?retryWrites=true&w=majority`;
app.set('view engine', 'ejs');

// connect to MongoDB, start server
mongoose.connect(mongoURL)
.then(client => {
    app.listen(port, host, () => {
        console.log(`Server running on port ${port}`)
    });
})
.catch(err => console.log(err.message));

// mount middleware
// create session connected to MongoDB
app.use(
  session({
      secret: "ajfeirf90aeu9eroejfoefj",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({mongoUrl: mongoURL}),
      cookie: {maxAge: 60*60*1000}
      })
);
app.use(flash());
// set local variables like current user and flash messages
app.use((req, res, next) => {
  res.locals.user = req.session.user||null;
  res.locals.userName = req.session.userName||null;
  // only load flash messages if not redirected
  res.locals.errorMessages = req.flash('error');
  res.locals.successMessages = req.flash('success');
  console.log(res.locals);
  next();
});
// serve static files that are in public dir
app.use(express.static('public'));
// allow us to parse data in request body; helps us deal with post requests
app.use(express.urlencoded({extended: true}));
// logs requests and responses
app.use(morgan('tiny'));
// used to create put and delete requests
app.use(methodOverride('_method'));
// used for obtaining images from form
app.use(fileUpload())

// mount routes
app.use('/', mainRoutes);
app.use('/events', eventRoutes);
app.use('/users', userRoutes);

// error handling
app.use((req, res, next) => {
  let err = new Error(`The server cannot locate ${req.url}`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if(!err.status) {
    err.status = 500;
    err.message = ("Internal Server Error");
  }
  console.error(err.stack)
  res.status(err.status);
  res.render('error', {
    error: err,
    page_name: `${err.status} Error`
  });
});