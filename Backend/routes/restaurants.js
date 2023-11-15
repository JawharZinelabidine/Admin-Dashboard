const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const isAuthenticated = require("../middlwares/isAuthenticated");
const isOwnerAuthorized = require("../middlwares/isOwnerAuthorized");
const isAdminAuthorized =require("../middlwares/isAdminAuthorized");
const isCustomerAuthorized = require("../middlwares/isCustomerAuthorized");


const {
  getRestaurants,
  getOne,
  createRestaurant,
  updloadRestaurantImages,
  deleteImageByProperty,
  updateImageByProperty,
  updateRestaurantInformation,
  updateRating,
  banRestaurantById,
  getBannedRestaurants,
  unbanRestaurant
} = require("../controller/restaurants");

router
  .route("/")
  .get(getRestaurants)
  .post(
    upload.fields([
      { name: "mainImage", maxCount: 1 },
      { name: "menuImages" },
      { name: "extraImages" },
    ]),
    isAuthenticated,
    isOwnerAuthorized,
    createRestaurant
  )

router
  .route("/upload")
  .post(
    upload.fields([
      { name: "mainImage", maxCount: 1 },
      { name: "menuImages" },
      { name: "extraImages" },
    ]),
    isAuthenticated,
    isOwnerAuthorized,
    updloadRestaurantImages
  );
router
  .route("/images")
  .delete(isAuthenticated, isOwnerAuthorized, deleteImageByProperty);
router
  .route("/images")
  .post(
    upload.fields([{ name: "newImageFile", maxCount: 1 }]),
    isAuthenticated,
    isOwnerAuthorized,
    updateImageByProperty
  );

router
  .route("/myRestaurant")
  .get(isAuthenticated, isOwnerAuthorized, getOne)
  .post(isAuthenticated, isOwnerAuthorized, updateRestaurantInformation);
  

router.route('/:restaurantId/:id')
  .put(isAuthenticated, isCustomerAuthorized, updateRating)
  router.route('/ban/:id')
  .post(banRestaurantById, isAuthenticated, isAdminAuthorized)
router.route("/ban")  
  .get(getBannedRestaurants,isAuthenticated, isAdminAuthorized)
router.route('/:id')
  .post(unbanRestaurant,isAuthenticated, isAdminAuthorized)
module.exports = router;
