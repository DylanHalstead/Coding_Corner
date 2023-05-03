const User = require('../models/user');
const Event = require('../models/event');
const Rsvp = require('../models/rsvp');

exports.new = (req, res)=>{
  res.render('./users/new', {
    page_name: 'Sign Up'
  });
};

exports.create = (req, res, next)=>{
  let user = new User(req.body);
  user.save()
  .then(user=> {
    req.flash('success', 'Account Created');
    res.redirect('/users/login');
  })
  .catch(err=>{
    if(err.name === 'ValidationError' ) {
      req.flash('error', err.message);  
      res.redirect('/users/new');
    }

    if(err.code === 11000) {
      req.flash('error', 'Email or Username Already Used');  
      res.redirect('/users/new');
    }

    next(err);
  }); 
};

exports.loginPage = (req, res, next) => {
  res.render('./users/login', {
    page_name: 'Login'
  });
}

exports.login = (req, res, next)=>{
  let email = req.body.email;
  if(email) email = email.toLowerCase();
  let password = req.body.password;
  User.findOne({ email: email })
  .then(user => {
    if (!user) {
      req.flash('error', 'Wrong Username');  
      res.redirect('/users/login');
    } else {
      user.comparePassword(password)
      .then(result=>{
        if(result) {
          req.session.firstName = user.firstName;
          req.session.username = user.username;
          req.session.user = user._id;
          req.flash('success', 'Successfully Logged In');
          res.redirect('/');
        } else {
          req.flash('error', 'Wrong Password');      
          res.redirect('/users/login');
        }
      });     
    }     
  })
  .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
  let id = req.session.user;
  Promise.all([User.findById(id), Event.find({'host': id}),
  Rsvp.find({'user': id}).populate('event')])
  .then(result => {
    let user = result[0];
    let events = result[1];
    let rsvps = result[2];
    res.render(`./users/profile`, {
      user: user,
      events: events,
      rsvps: rsvps,
      page_name: `${user.firstName}'s Profile`
    });
  })
  .catch(err=>next(err));
};

exports.logout = (req, res, next)=>{
  req.session.destroy(err=>{
    if(err) next(err);
    else {
      req.flash('success', 'Successfully Logged Out');
      res.redirect('/')
    };  
  });
};



