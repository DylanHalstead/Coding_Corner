const Event = require('../models/event');

exports.index = (req, res, next) => {
  // Event.aggregate([
  //   { $sort: { category: 1, start_time: -1 } },
  //   { $group: { _id: "$category", events: { $push: "$$ROOT" } } },
  //   { $sort: { _id: 1 } }
  // ])
  Event.find()
  .then(events => {
    // sort events by category and put into an object
    let sortedEvents = {};
    const categories = Event.schema.path('category').enumValues;
    categories.forEach(category => {
      sortedEvents[category] = events.filter(event => event.category === category);
    });
    
    // sort events by start date
    for(const category in sortedEvents){
      sortedEvents[category].sort((a, b) => a.start - b.start);
    }
    
    res.render('./events/index', {
      events: sortedEvents,
      page_name: 'Events'
    });
  })
  .catch(err => next(err));
}

exports.new = (req, res) => {
  res.render('./events/new', {
    page_name: 'New Event'
  });
};

// POST handler for processing the uploaded file
exports.create = (req, res, next) => {
  const eventData = req.body;
  let event = {
    category: eventData.category,
    title: eventData.title,
    details: eventData.details,
    host: req.session.user,
    start: eventData.start,
    end: eventData.end,
    location: eventData.location,
  };
  // Validate image was uploaded
  if(req.files){
    const image = req.files.image;
    event.image = {
      data: image.data,
      filename: image.name,
      contentType: image.mimetype
    }
  }

  event = new Event(event);
  event.save()
  .then(result => {
    req.flash('success', 'Event Created');
    res.redirect('/events');
  })
  .catch(err => {
    if(err.name === 'ValidationError'){
      err.status = 400;
    }
    next(err);
  });
};

exports.show = (req, res, next) => {
  Event.findById(req.params.id).populate('host', 'username')
  .then(event => {
    res.render('./events/event', {
      event: event,
      page_name: event.title
    });
  })
  .catch(err => next(err));
}

exports.edit = (req, res, next) => {
  Event.findById(req.params.id)
  .then(event => {
    res.render('./events/edit', {
      event: event,
      page_name: `Edit: ${event.title}`,
      localToISO: Event.localToISO
    });
  })
  .catch(err => next(err));
};

exports.update = (req, res, next) => {
  const id = req.params.id;
  const formData = req.body;
  let event = {
    category: formData.category,
    title: formData.title,
    details: formData.details,
    host: formData.host,
    start: formData.start,
    end: formData.end,
    location: formData.location
  }
  // if user changes image, add it to update request
  if(req.files){
    const image = req.files.image;
    event.image = {
      data: image.data,
      filename: image.name,
      contentType: image.mimetype
    }
  }

  Event.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
  .then(event => {
    req.flash('success', 'Event Edited');
    res.redirect(`/events/${id}`);
  })
  .catch(err => {
    if(err.name === 'ValidationError'){
      err.status = 400;
    }
    next(err);
  });
};

exports.delete = (req, res, next) => {
  Event.findByIdAndDelete(req.params.id, {useFindAndModify: false})
  .then(event => {
    req.flash('success', 'Event Deleted');
    res.redirect('/events')
  })
  .catch(err => next(err));
};