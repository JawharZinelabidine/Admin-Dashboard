const express = require('express');
const router = express.Router();
const isAuthenticated = require("../middlwares/isAuthenticated");
const isOwnerAuthorized = require("../middlwares/isOwnerAuthorized");

const { paymentIntent, setPremium, setBasic } = require('../controller/payments');

router.route('/intents')
    .post(paymentIntent)
router.route('/premium')
    .put(isAuthenticated, isOwnerAuthorized, setPremium)
router.route('/basic')
    .put(isAuthenticated, isOwnerAuthorized, setBasic)

module.exports = router;