const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const {
    getProfile,
    updateProfile,
    registerLinkAndRetrieveAccounts,
    getSubscriptionInformation,
    getSubscriptionInformationByGmail,
    getMonthSubscriptionInformationByTransaction,
    getRecentSubscriptionInformationByTransaction,
    verifyUserBankConnection,
} = require('../controllers/user.controller');

router.get('/users/me', authMiddleware, getProfile);
router.put('/users/me', authMiddleware, updateProfile);
router.get('/belvo/link', authMiddleware, registerLinkAndRetrieveAccounts);
router.get('/account/verify', authMiddleware, verifyUserBankConnection);
router.get('/recurring-expenses/information', authMiddleware, getSubscriptionInformation);
router.get('/recurring-expenses/information/everymonth', authMiddleware, getMonthSubscriptionInformationByTransaction);
router.get('/recurring-expenses/information/recent', authMiddleware, getRecentSubscriptionInformationByTransaction);
router.get('/gmail/recurring-information', authMiddleware, getSubscriptionInformationByGmail);

module.exports = router;
