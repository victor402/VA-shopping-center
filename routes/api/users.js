const express = require('express');
const esnureLoggedIn = require('../../config/ensureLoggedIn');

const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);

// Auth Required
router.get('/check-token', esnureLoggedIn, usersCtrl.checkToken);

module.exports = router
