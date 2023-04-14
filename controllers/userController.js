const User = require('../models/user');
const Event = require('../models/event');

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
      return res.redirect('/users/signup');
    }

    if(err.code === 11000) {
      req.flash('error', 'Email Already Used');  
      return res.redirect('/users/signup');
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
  let credential = req.body.credential;
  let password = req.body.password;
  User.findOne({ $or: [
    { email: credential },
    { username: credential }
  ] })
  .then(user => {
    if (!user) {
      req.flash('error', 'Wrong Username');  
      res.redirect('/users/login');
    } else {
      user.comparePassword(password)
      .then(result=>{
        if(result) {
          req.session.userName = user.firstName;
          req.session.user = user._id;
          req.flash('success', 'Successfully Logged In');
          res.redirect('/users/profile');
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
  Promise.all([User.findById(id), Event.find({'host': id})])
  .then(result => {
    let user = result[0];
    let events = result[1];
    res.render(`./users/profile`, {
      user: user,
      events: events,
      page_name: `Profile: ${user.username}`
    });
  })
  .catch(err=>next(err));
};

exports.logout = (req, res, next)=>{
  req.session.destroy(err=>{
    if(err) next(err);
    else res.redirect('/');  
  });
};



