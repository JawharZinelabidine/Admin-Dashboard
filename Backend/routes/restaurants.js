const express = require('express');
const router = express.Router();


const {getRestaurants, getOne} = require('../controller/restaurants');

router.route('/')
    .get(getRestaurants)
    router.route('/:id')
    .get(getOne)



    

module.exports = router;