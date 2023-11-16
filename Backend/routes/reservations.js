const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlwares/isAuthenticated')
const isCustomerAuthorized = require('../middlwares/isCustomerAuthorized')

const isOwnerAuthorized = require('../middlwares/isOwnerAuthorized')

const { sendReservationRequest, fetchPendingReservationRequests, fetchResolvedReservationRequests,
    approveReservation, rejectReservation, fetchUpcomingReservations, fetchExpiredReservations, checkReviewNotification,
    removeReviewNotification } = require('../controller/reservations');

router.route('/:restaurantId')
    .get()
    .post(isAuthenticated, isCustomerAuthorized, sendReservationRequest)

router.route('/pending/:restaurantId')
    .get(isAuthenticated, isOwnerAuthorized, fetchPendingReservationRequests)

router.route('/resolved/:restaurantId')
    .get(isAuthenticated, isOwnerAuthorized, fetchResolvedReservationRequests)

router.route('/upcoming')
    .get(isAuthenticated, isCustomerAuthorized, fetchUpcomingReservations)

router.route('/expired')
    .get(isAuthenticated, isCustomerAuthorized, fetchExpiredReservations)

router.route('/approve/:reservationId/:expoToken')
    .put(isAuthenticated, isOwnerAuthorized, approveReservation)

router.route('/reject/:reservationId/:expoToken')
    .put(isAuthenticated, isOwnerAuthorized, rejectReservation)
router.route('/notification')
    .put(isAuthenticated, isCustomerAuthorized, removeReviewNotification)
router.route('/notification/:id')
    .get(isAuthenticated, isCustomerAuthorized, checkReviewNotification)




module.exports = router;