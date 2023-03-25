require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const eventRoutes = require('./routes/eventRoutes')
const mainRoutes = require('./routes/mainRoutes')
const mongoose = require('mongoose');

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
  console.error(err.stack)
  res.status(err.status);
  res.render('error', {
    error: err,
    page_name: `${err.status} Error`
  });
});