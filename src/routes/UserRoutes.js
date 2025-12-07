const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.get('/', (req, res) => userController.getUsers(req, res));

router.get('/online-users', userController.getOnlineUsers);

module.exports = router;