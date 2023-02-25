// require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const eventRoutes = require('./routes/eventRoutes')
const mainRoutes = require('./routes/mainRoutes')

// create app
const app = express();

// configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

// mount middleware
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
  res.status(err.status);
  res.render('error', {
    error: err,
    page_name: 'Error'
  });
});

// start server
app.listen(port, host, () => {
  console.log(`Server running on port ${port}`)
})