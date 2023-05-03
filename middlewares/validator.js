const { body, validationResult } = require('express-validator');
const Event = require('../models/event');
const Rsvp = require('../models/rsvp');

exports.validateId = (req, res, next) => {
  const id = req.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error('Invalid story id');
    err.status = 400;
    next(err);
  }
  next();
}

exports.validateSignup = [body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
  body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
  body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
  body('username', 'Username must be at least 4 characters and at most 32 characters').isLength({min: 4, max: 32}).trim().escape(),
  body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateLogIn = [
  // Check that credential is either an email or a username
  body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
  body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateEvent = [
  body('category', 'Category is required').notEmpty().isIn(Event.schema.path('category').enumValues).trim().escape(),
  body('title', 'Title is required').notEmpty().trim().escape(),
  body('details', 'Details must be at least 10 characters').notEmpty().isLength({min: 10}).trim().escape(),
  body('start', 'Start time must be after the current time').notEmpty().isISO8601()
    .custom((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
      })
    .custom((value, { req }) => {
        return new Date(value) > new Date();
      })
    .trim().escape(),
  body('end', 'End time must be after start time').notEmpty().isISO8601()
    .custom((value, { req }) => new Date(value) > new Date(req.body.start))
    .trim().escape(),
  body('location', 'Location is required').notEmpty().trim().escape(),
  body('image', 'An event image is required')
    .custom((value, { req }) => {
      // Check only when there is a new event, editing is guarenteed to have some type of image
      if(req.method === 'POST') {
        // Validate there's a file
        if(!req.files) {
          return false;
        }
        // Validate file type
        if(req.files.image.mimetype !== 'image/png' && req.files.image.mimetype !== 'image/jpg' && req.files.image.mimetype !== 'image/jpeg' && req.files.image.mimetype !== 'image/gif'){
          return false;
        }
      }
      return true;
    })
];

exports.validateRsvp = [
  body('response', `RSVP response must be on of the following: ${Rsvp.schema.path('response').enumValues.join(', ')}`).notEmpty().trim().escape().isIn(Rsvp.schema.path('response').enumValues)
];

exports.validateResult = (req, res, next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(err=>req.flash('error', err.msg));
        res.redirect('back');
    } else {
        next();
    }
}