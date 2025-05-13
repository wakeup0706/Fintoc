const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const {
    getProfile,
    updateProfile,
    registerLinkAndRetrieveAccounts,
    getSubscriptionInformation,
} = require('../controllers/user.controller');

router.get('/users/me', authMiddleware, getProfile);
router.put('/users/me', authMiddleware, updateProfile);
router.get('/belvo/link', authMiddleware, registerLinkAndRetrieveAccounts);
router.get('/recurring-expenses/information', authMiddleware, getSubscriptionInformation);
module.exports = router;
