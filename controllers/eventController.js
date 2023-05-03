const Event = require('../models/event');
const Rsvp = require('../models/rsvp');

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
    image: {
      data: req.files.image.data,
      filename: req.files.image.name,
      contentType: req.files.image.mimetype
    }
  };

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
  Event.findById(req.params.id).populate('host', '_id username')
  .then(event => {
    // see if user has RSVPed
    Rsvp.findOne({event: req.params.id, user: req.session.user})
    .then(rsvp => {
      // count all rsvps for this event, seperate by response.
      Rsvp.aggregate([
        { $match: { event: event._id } },
        { $group: { _id: "$response", count: { $sum: 1 } } }
      ])
      .then(rsvpCounts => {
        // convert rsvpCounts to a better format
        let rsvpObj = {};
        for (let rsvpCount of rsvpCounts) {
          rsvpObj[rsvpCount._id] = rsvpCount.count;
        }
        let response = 'NO RESPONSE';
        if(rsvp){
          response = rsvp.response;
        }
        res.render('./events/event', {
          event: event,
          response: response,
          rsvpCounts: rsvpObj,
          page_name: event.title
        });
      })
      .catch(err => next(err));
    })
    .catch(err => next(err));
  })
  .catch(err => {next(err)});
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
    // delete all rsvps for this event
    Rsvp.deleteMany({event: req.params.id})
    .then(result => {
      req.flash('success', 'Event Deleted');
      res.redirect('/events');
    })
    .catch(err => next(err));
  })
  .catch(err => next(err));
};

exports.rsvp = (req, res, next) => {
  let response = req.body.response
  Rsvp.findOne({event: req.params.id, user: req.session.user})
  .then(rsvp => {
    if(rsvp){
      console.log(response)
      Rsvp.findByIdAndUpdate(rsvp._id, {response: response}, {useFindAndModify: false})
      .then(result => {
        req.flash('success', `You've changed your RSVP from ${rsvp.response} to ${response}`);
        res.redirect('/users/profile');
      })
      .catch(err => next(err));
    } else {
      rsvp = new Rsvp({
        event: req.params.id,
        user: req.session.user,
        response: response
      });
      rsvp.save()
      .then(result => {
        req.flash('success', `You've RSVPed with ${response}`);
        res.redirect('/users/profile');
      })
      .catch(err => next(err));
    }
  })
  .catch(err => next(err));
};