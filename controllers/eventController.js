const model = require('../models/event');

exports.index = (req, res) => {
  let events = model.sorted();
  res.render('./events/index', {
    events: events,
    page_name: 'Events'
  })
}

exports.new = (req, res) => {
  res.render('./events/new', {
    page_name: 'New Event'
  });
};

exports.create = (req, res) => {
  let event = req.body;
  let image = req.files.image;
  model.save(event, image);
  res.redirect('/events');
};

exports.show = (req, res, next) => {
  let event = model.findById(req.params.id);
  if(event) {
    res.render('./events/event', {
      page_name: event.title,
      event: event
    });
  } else {
    let err = new Error(`Cannot find event with id ${req.params.id}`);
    err.status = 404;
    next(err);
  }
}

exports.edit = (req, res, next) => {
  let event = model.findById(req.params.id);
  let ISOStart = model.dateToISO(event.start);
  let ISOEnd = model.dateToISO(event.end);
  console.log(ISOStart);
  console.log(ISOEnd);
  if(event) {
    res.render('./events/edit', {
      page_name: `Edit: ${event.title}`,
      event: event,
      ISOStart: ISOStart,
      ISOEnd: ISOEnd
    });
  } else {
    let err = new Error(`Cannot find event with id ${req.params.id}`);
    err.status = 404;
    next(err);
  }
};

exports.update = (req, res, next) => {
  if (model.updateById(req.params.id, req.body)) {
    res.redirect(`/events/${req.params.id}`);
  } else {
    let err = new Error(`Cannot find event with id ${req.params.id}`);
    err.status = 404;
    next(err);
  }
};

exports.delete = (req, res, next) => {
  if(model.deleteById(req.params.id)) {
    res.redirect('/events');
  } else {
    let err = new Error(`Cannot find event with id ${req.params.id}`);
    err.status = 404;
    next(err);
  }
};