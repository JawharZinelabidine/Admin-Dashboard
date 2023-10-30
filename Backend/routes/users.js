const express = require('express');
const router = express.Router();


const { createCustomer } = require('../controller/users');

router.route('/')
    .get(createCustomer)

module.exports = router;