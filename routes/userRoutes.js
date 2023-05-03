const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const {logInLimiter} = require('../middlewares/rateLimiters');
const {validateLogIn, validateSignup, validateResult} = require('../middlewares/validator');


const router = express.Router();

router.get('/new', isGuest, controller.new);

router.post('/', isGuest, validateSignup, validateResult, controller.create);

router.get('/login', isGuest, controller.loginPage);

router.post('/login', isGuest, logInLimiter, validateLogIn, validateResult, controller.login);

router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;