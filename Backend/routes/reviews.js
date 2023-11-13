const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlwares/isAuthenticated')
const isCustomerAuthorized = require('../middlwares/isCustomerAuthorized')
const isOwnerAuthorized = require('../middlwares/isOwnerAuthorized')

const { getPendingReviews, createReview, getAllReviews } = require('../controller/reviews');

router.route('/')
    .get(isAuthenticated, isCustomerAuthorized, getPendingReviews)
router.route('/:restaurantId')
    .post(isAuthenticated, isCustomerAuthorized, createReview)
    .get(getAllReviews)
router.route('/owner/:restaurantId')
    .get(isAuthenticated, isOwnerAuthorized, getAllReviews)


module.exports = router;