const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/admin.controller');
const adminMiddleware = require('../middlewares/admin.middleware');

router.post('/get-users', adminMiddleware, getUsers);

module.exports = router;
