const express = require('express');
const router = express.Router();
const { login, register, sendPermissionRequest, requestPasswordReset, resetPassword } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/send/permission', sendPermissionRequest)
router.post('/request/reset-password', requestPasswordReset);
router.post('/reset-password', resetPassword);

module.exports = router;

