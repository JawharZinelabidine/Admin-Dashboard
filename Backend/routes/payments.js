const express = require('express');
const router = express.Router();


const { paymentIntent } = require('../controller/payments');

router.route('/intents')
    .post(paymentIntent)

module.exports = router;