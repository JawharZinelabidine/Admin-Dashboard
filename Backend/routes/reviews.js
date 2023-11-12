const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlwares/isAuthenticated')
const isCustomerAuthorized = require('../middlwares/isCustomerAuthorized')

const { getPendingReviews } = require('../controller/reviews');

router.route('/')
    .get(isAuthenticated, isCustomerAuthorized, getPendingReviews)

module.exports = router;