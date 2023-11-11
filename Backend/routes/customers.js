const express = require('express');
const router = express.Router();


const { getCustomers, createCustomers, customerSignin, getOneCustomers, getExpoToken, verifyEmail, checkNotification, removeNotification , forgotPassword   } = require('../controller/customers');

router.route('/')
    .get(getCustomers)
    .post(createCustomers);

router.route("/verify/:token").get(verifyEmail);

router.route('/forgot-password').post(forgotPassword);

router.route('/signin')
    .post(customerSignin);
router.route('/notification/:id')
    .get(checkNotification)
    .put(removeNotification)
router.route('/:id')
    .get(getOneCustomers)
    .put(getExpoToken)


module.exports = router;