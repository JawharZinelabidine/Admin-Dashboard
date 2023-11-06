const express = require('express');
const router = express.Router();


const { getCustomers, createCustomers, customerSignin, getOneCustomers } = require('../controller/customers');

router.route('/')
    .get(getCustomers)
    .post(createCustomers);
router.route('/signin')
    .post(customerSignin);
router.route('/:id')
    .get(getOneCustomers);

module.exports = router;