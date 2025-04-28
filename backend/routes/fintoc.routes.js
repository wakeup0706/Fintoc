const express = require('express');
const router = express.Router();
const { generateToken } = require('../controllers/fintoc.controller');
const authMiddleware = require('../middlewares/auth.middleware'); // path to your auth middleware

router.post('/get-widget-token', authMiddleware, generateToken);

module.exports = router;
