const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlwares/isAuthenticated')
const isCustomerAuthorized = require('../middlwares/isCustomerAuthorized')

const isOwnerAuthorized = require('../middlwares/isOwnerAuthorized')

const { ownerSend, customerSend, getRestaurantConversations, getCustomerConversations, getRestaurantMessages,
    getCustomerMessages } = require('../controller/messages');


router.route('/owner/:customerId')
    .post(isAuthenticated, isOwnerAuthorized, ownerSend)
router.route('/customer/:restaurantId')
    .post(isAuthenticated, isCustomerAuthorized, customerSend)
router.route('/owner/conversations')
    .get(isAuthenticated, isOwnerAuthorized, getRestaurantConversations)
router.route('/customer/conversations')
    .get(isAuthenticated, isCustomerAuthorized, getCustomerConversations)
router.route('/owner/messages/:customerId')
    .get(isAuthenticated, isOwnerAuthorized, getRestaurantMessages)
router.route('/customer/messages/:restaurantId')
    .get(isAuthenticated, isCustomerAuthorized, getCustomerMessages)

module.exports = router;