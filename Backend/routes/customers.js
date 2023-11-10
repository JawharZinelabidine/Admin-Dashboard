const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlwares/isAuthenticated')
const isCustomerAuthorized = require('../middlwares/isCustomerAuthorized')


const { getCustomers, createCustomers, customerSignin, getOneCustomers, getExpoToken, verifyEmail, checkNotification, removeNotification } = require('../controller/customers');

router.route('/')
    .get(isAuthenticated, getCustomers)
    .post(createCustomers);

router.route("/verify/:token").get(verifyEmail);

router.route('/signin')
    .post(customerSignin);
router.route('/notification')
    .get(isAuthenticated, isCustomerAuthorized, checkNotification)
    .put(isAuthenticated, isCustomerAuthorized, removeNotification)
router.route('/:id')
    .get(isAuthenticated, isCustomerAuthorized, getOneCustomers)
router.route('/expo')
    .put(isAuthenticated, isCustomerAuthorized, getExpoToken)


module.exports = router;