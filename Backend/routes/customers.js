const express = require('express');
const router = express.Router();


const { getCustomers, createCustomers, customerSignin} = require('../controller/customers');

router.route('/')
    .get(getCustomers)
    .post(createCustomers);
router.route('/signin')
    .post(customerSignin);   

module.exports = router;