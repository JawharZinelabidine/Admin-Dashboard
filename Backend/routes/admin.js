const express = require("express");
const router = express.Router();
const isAuthenticated = require('../middlwares/isAuthenticated')
const isAdminAuthorized = require('../middlwares/isAdminAuthorized')
const {
  getPendingRestaurants,
  getVerifiedOwner,
  reviewRestaurantRequest,
  getPendingRestaurant,
  signin
} = require("../controller/admin");

router.route("/restaurants").get(isAuthenticated, isAdminAuthorized, getPendingRestaurants);

router.route("/owner/:id").get(isAuthenticated, isAdminAuthorized, getVerifiedOwner);

router
  .route("/restaurant/:id")
  .get(isAuthenticated, isAdminAuthorized, getPendingRestaurant)
  .post(isAuthenticated, isAdminAuthorized, reviewRestaurantRequest);


router.route("/signin").post(signin);

module.exports = router;
