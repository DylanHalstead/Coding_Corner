const rateLimiter = require('express-rate-limit');

exports.logInLimiter = rateLimiter({
  windowMs: 60*1000, // 1 minute
  max: 5,
  handler: (req, res, next) => {
    let err = new Error('Too many login attempts, try again later');
    err.status = 429;
    next(err);
  }
});