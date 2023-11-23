const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlwares/isAuthenticated')
const isCustomerAuthorized = require('../middlwares/isCustomerAuthorized')
const isPremiumAuthorized = require('../middlwares/isPremiumAuthorized')
const isOwnerAuthorized = require('../middlwares/isOwnerAuthorized')

const { ownerSend, customerSend, getRestaurantConversations, getCustomerConversations, getRestaurantMessages,
    getCustomerMessages, checkNotification, removeNotification } = require('../controller/messages');


router.route('/owner/:customerId')
    .post(isAuthenticated, isOwnerAuthorized, isPremiumAuthorized, ownerSend)
router.route('/customer/:restaurantId')
    .post(isAuthenticated, isCustomerAuthorized, customerSend)
router.route('/owner/conversations')
    .get(isAuthenticated, isOwnerAuthorized, isPremiumAuthorized, getRestaurantConversations)
router.route('/customer/conversations')
    .get(isAuthenticated, isCustomerAuthorized, getCustomerConversations)
router.route('/owner/messages/:customerId')
    .get(isAuthenticated, isOwnerAuthorized, isPremiumAuthorized, getRestaurantMessages)
router.route('/customer/messages/:restaurantId')
    .get(isAuthenticated, isCustomerAuthorized, getCustomerMessages)
router.route('/owner/notification')
    .get(isAuthenticated, isOwnerAuthorized, checkNotification)
    .put(isAuthenticated, isOwnerAuthorized, removeNotification)


module.exports = router;