const express = require("express");
const router = express.Router();
const isAuthenticated = require('../middlwares/isAuthenticated')
const isAdminAuthorized = require('../middlwares/isAdminAuthorized')
const {
  getPendingRestaurants,
  getVerifiedOwner,
  reviewRestaurantRequest,
  getPendingRestaurant,
  getApprovedOrDeclinedRestaurants,

  signin
} = require("../controller/admin");
const { getRestaurants } = require("../controller/restaurants");

router.route("/restaurants").get(isAuthenticated, isAdminAuthorized, getPendingRestaurants);

router.route("/owners").get(getVerifiedOwner);
router
  .route("/restaurants").get(getRestaurants)
router.route("/owner/:id").get(isAuthenticated, isAdminAuthorized, getVerifiedOwner);

router.route("/restaurants").get(isAuthenticated, isAdminAuthorized, getPendingRestaurants);

router.route("/history").get(isAuthenticated, isAdminAuthorized, getApprovedOrDeclinedRestaurants);


router
  .route("/restaurant/:id")
  .get(isAuthenticated, isAdminAuthorized, getPendingRestaurant)
  .post(isAuthenticated, isAdminAuthorized, reviewRestaurantRequest);


router.route("/signin").post(signin);

module.exports = router;
