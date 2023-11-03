const express = require('express');
const router = express.Router();


const {getRestaurants, getOne, createRestaurant} = require('../controller/restaurants');

router.route('/')
    .get(getRestaurants)
    .post(createRestaurant)

router.route('/:id')
    .get(getOne)


module.exports = router;