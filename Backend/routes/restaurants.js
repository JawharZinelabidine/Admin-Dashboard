const express = require('express');
const router = express.Router();
const multer = require('multer')

const upload = multer()


const {getRestaurants, getOne, createRestaurant,updloadRestaurantImages} = require('../controller/restaurants');

router.route('/')
    .get(getRestaurants)
    .post(createRestaurant)

router.route('/:id')
    .get(getOne)

router.route('/upload/:id')
    .post(
      upload.single('main_image'),         
      upload.array('menu_images', 5),      
      upload.array('extra_images', 5),    
      updloadRestaurantImages
    );



module.exports = router;