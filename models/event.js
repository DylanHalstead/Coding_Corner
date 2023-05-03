const mongoose = require('mongoose');
const Rsvp = require('./rsvp');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  category: {type: String, required: [true, 'Category is required'], enum: ['Gaming', 'School', 'Cinema', 'Event', 'Other']},
  title: {type: String, required: [true, 'Title is required']},
  details: {type: String, required: [true, 'Details are required'], minlength: [10, 'Details must be at least 10 characters long']},
  host: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'A host is required']},
  start: {type: Date, required: [true, 'Start time is required']},
  end: {type: Date, required: [true, 'End time is required']},
  location: {type: String, required: [true, 'Location is required']},
  image: {type: {
    data: Buffer,
    filename: String,
    contentType: String
  }, required: [true, 'An image is required']}
});

eventSchema.statics.localToISO = dateTimeStr => {
  const dateTime = new Date(dateTimeStr);
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const date = String(dateTime.getDate()).padStart(2, '0');
  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  const formattedDateTime = `${year}-${month}-${date}T${hours}:${minutes}`;
  return formattedDateTime;
}

module.exports = mongoose.model('Event', eventSchema);