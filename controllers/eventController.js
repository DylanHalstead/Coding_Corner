const model = require('../models/event');

exports.index = (req, res, next) => {
  model.find()
  .then(events => {
    // sort events by category and put into an object
    let sortedEvents = {};
    const categories = model.schema.path('category').enumValues;
    categories.forEach(category => {
      sortedEvents[category] = events.filter(event => event.category === category);
    });
    
    for(const category in sortedEvents){
      // sort events by start date
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
  // Grab event and image from request body
  const event = req.body;
  const image = req.files.image;
  // Create new event
  const story = new model({
    category: event.category,
    title: event.title,
    details: event.details,
    host: event.host,
    start: event.start,
    end: event.end,
    location: event.location,
    image: {
      data: image.data,
      filename: image.name,
      contentType: image.mimetype
    }
  });
  story.save()
  .then(result => res.redirect('/events'))
  .catch(err => {
    if(err.name === 'ValidationError'){
      err.status = 400;
    }
    next(err);
  });
};

exports.show = (req, res, next) => {
  const id = req.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)){
    let err = new Error(`Invalid event id`);
    err.status = 400;
    next(err);
  }

  model.findById(id)
  .then(event => {
    if(event) {
      res.render('./events/event', {
        event: event,
        page_name: event.title
      });
    }
    else {
      let err = new Error(`Cannot find event with id ${id}`);
      err.status = 404;
      next(err);
    }
  })
  .catch(err => next(err));
}

exports.edit = (req, res, next) => {
  const id = req.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)){
    let err = new Error(`Invalid event id`);
    err.status = 400;
    next(err);
  }

  model.findById(id)
  .then(event => {
    if(event) {
      res.render('./events/edit', {
        event: event,
        page_name: `Edit: ${event.title}`
      });
    } else {
      let err = new Error(`Cannot find event with id ${id}`);
      err.status = 404;
      next(err);
    }
  })
  .catch(err => next(err));
};

exports.update = (req, res, next) => {
  const id = req.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)){
    let err = new Error(`Invalid event id`);
    err.status = 400;
    next(err);
  }

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
    event.image = {
      data: req.files.image.data,
      filename: req.files.image.name,
      contentType: req.files.image.mimetype
    }
  }

  model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
  .then(event => {
    if(event){
      res.redirect(`/events/${id}`);
    } else {
      let err = new Error(`Cannot find event with id ${id}`);
      err.status = 404;
      next(err);
    }
  })
  .catch(err => {
    if(err.name === 'ValidationError'){
      err.status = 400;
    }
    next(err);
  });
};

exports.delete = (req, res, next) => {
  let id = req.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)){
      let err = new Error(`Invalid story id`);
      err.status = 400;
      next(err);
  }

  model.findByIdAndDelete(id, {useFindAndModify: false})
  .then(event => {
    if(event){
      res.redirect('/events');
    } else {
      let err = new Error(`Cannot find Event with id ${id}`);
      err.status = 404;
      next(err);
    }
  })
  .catch(err => {
    if(err.name === 'ValidationError'){
      err.status = 400;
    }
    next(err);
  });
};