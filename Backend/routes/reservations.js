const express = require('express');
const router = express.Router();


const { sendReservationRequest, fetchReservationRequests } = require('../controller/reservations');

router.route('/:customerId/:restaurantId')
    .get(fetchReservationRequests)
    .post(sendReservationRequest)

module.exports = router;