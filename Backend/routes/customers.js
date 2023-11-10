const express = require('express');
const router = express.Router();


const { getCustomers, createCustomers, customerSignin, getOneCustomers, getExpoToken ,verifyEmail} = require('../controller/customers');

router.route('/')
    .get(getCustomers)
    .post(createCustomers);

 router.route("/verify/:token").get(verifyEmail);

router.route('/signin')
    .post(customerSignin);
router.route('/:id')
    .get(getOneCustomers)
    .put(getExpoToken)

module.exports = router;