const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlwares/isAuthenticated')
const isCustomerAuthorized = require('../middlwares/isCustomerAuthorized')


const { getCustomers, createCustomers, customerSignin, getOneCustomers, getExpoToken, verifyEmail, checkNotification, removeNotification, forgotPassword, verifyResetCode, updatePassword, getLoggedInUser } = require('../controller/customers');

router.route('/')
    .get(getCustomers)
    .post(createCustomers);




router.route("/verify/:token")
    .get(verifyEmail);

router.route('/forgotpassword').post(forgotPassword);
router.route('/verifyresetcode').post(verifyResetCode);
router.route('/updatePassword').put(updatePassword);


router.route('/signin')
    .post(customerSignin);
router.route('/notification')
    .get(isAuthenticated, isCustomerAuthorized, checkNotification)
    .put(isAuthenticated, isCustomerAuthorized, removeNotification)
router.route('/:id')
    .get(isAuthenticated, isCustomerAuthorized, getOneCustomers)
router.route('/expo')
    .put(isAuthenticated, isCustomerAuthorized, getExpoToken)

router.route('/profile/')
    .get(isAuthenticated,isCustomerAuthorized, getLoggedInUser);

module.exports = router;