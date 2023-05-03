const express = require('express');
const controller = require('../controllers/eventController');
const {isLoggedIn, isHost, isNotHost} = require('../middlewares/auth');
const {validateId, validateResult, validateEvent, validateRsvp} = require('../middlewares/validator');

const router = express.Router();

router.get('/', controller.index);

router.get('/new', isLoggedIn, controller.new);

router.post('/', isLoggedIn, validateEvent, validateResult, controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', validateId, isLoggedIn, isHost, controller.edit);

router.put('/:id', validateId, isLoggedIn, isHost, validateEvent, validateResult, controller.update);

router.delete('/:id', validateId, isLoggedIn, isHost, controller.delete);

router.post('/:id/rsvp', isLoggedIn, isNotHost, validateRsvp, validateResult, controller.rsvp);

module.exports = router