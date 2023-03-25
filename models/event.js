const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  category: {type: String, required: [true, 'Category is required'], enum: ['Gaming', 'School', 'Cinema', 'Event', 'Other']},
  title: {type: String, required: [true, 'Title is required']},
  details: {type: String, required: [true, 'Details are required'], minlength: [10, 'Details must be at least 10 characters long']},
  host: {type: String, required: [true, 'Host is required']},
  start: {type: Date, required: [true, 'Start time is required']},
  end: {type: Date, required: [true, 'End time is required']},
  location: {type: String, required: [true, 'Location is required']},
  image: {type: {
    data: Buffer,
    filename: String,
    contentType: String
  }, required: [true, 'An image is required']}
});

module.exports = mongoose.model('Event', eventSchema);