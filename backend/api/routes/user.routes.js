const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { getProfile, updateProfile } = require('../controllers/user.controller');

router.get('/users/me', authMiddleware, getProfile);
router.put('/users/me', authMiddleware, updateProfile);

module.exports = router;
