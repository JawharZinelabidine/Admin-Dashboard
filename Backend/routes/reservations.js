const express = require('express');
const router = express.Router();


const { sendReservationRequest, fetchPendingReservationRequests, fetchResolvedReservationRequests,
    approveReservation, rejectReservation, fetchUpcomingReservations, fetchExpiredReservations } = require('../controller/reservations');

router.route('/:customerId/:restaurantId')
    .get()
    .post(sendReservationRequest)

router.route('/pending/:restaurantId')
    .get(fetchPendingReservationRequests)

router.route('/resolved/:restaurantId')
    .get(fetchResolvedReservationRequests)

router.route('/upcoming/:customerId')
    .get(fetchUpcomingReservations)

router.route('/expired/:customerId')
    .get(fetchExpiredReservations)

router.route('/approve/:reservationId/:expoToken')
    .put(approveReservation)

router.route('/reject/:reservationId/:expoToken')
    .put(rejectReservation)



module.exports = router;