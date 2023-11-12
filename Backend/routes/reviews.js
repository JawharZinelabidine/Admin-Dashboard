const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlwares/isAuthenticated')
const isCustomerAuthorized = require('../middlwares/isCustomerAuthorized')

const { getPendingReviews, createReview } = require('../controller/reviews');

router.route('/')
    .get(isAuthenticated, isCustomerAuthorized, getPendingReviews)
router.route('/:restaurantId')
    .post(isAuthenticated, isCustomerAuthorized, createReview)

module.exports = router;