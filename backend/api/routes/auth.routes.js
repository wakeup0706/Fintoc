const express = require('express');
const router = express.Router();
const { login, register, sendPermissionRequest } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/send/permission', sendPermissionRequest)

module.exports = router;
