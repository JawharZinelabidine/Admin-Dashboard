const express = require('express');
const router = express.Router();


const { createRestaurant } = require('../controller/restaurants');

router.route('/')
    .get()
    .post(createRestaurant)

module.exports = router;