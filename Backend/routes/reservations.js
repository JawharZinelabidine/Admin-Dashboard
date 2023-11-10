const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlwares/isAuthenticated')


const { sendReservationRequest, fetchPendingReservationRequests, fetchResolvedReservationRequests,
    approveReservation, rejectReservation, fetchUpcomingReservations, fetchExpiredReservations } = require('../controller/reservations');

router.route('/:restaurantId')
    .get()
    .post(isAuthenticated, sendReservationRequest)

router.route('/pending/:restaurantId')
    .get(isAuthenticated, fetchPendingReservationRequests)

router.route('/resolved/:restaurantId')
    .get(isAuthenticated, fetchResolvedReservationRequests)

router.route('/upcoming')
    .get(isAuthenticated, fetchUpcomingReservations)

router.route('/expired')
    .get(isAuthenticated, fetchExpiredReservations)

router.route('/approve/:reservationId/:expoToken')
    .put(isAuthenticated, approveReservation)

router.route('/reject/:reservationId/:expoToken')
    .put(isAuthenticated, rejectReservation)



module.exports = router;