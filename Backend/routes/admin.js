const express = require("express");
const router = express.Router();

const {
  getPendingRestaurants,
  getVerfiedOwners,
  reviewRestaurantRequest,
} = require("../controller/admin");
const { getRestaurants } = require("../controller/restaurants");

router
  .route("/restaurants")
  .get(getPendingRestaurants)
  .post(reviewRestaurantRequest);

router.route("/owners").get(getVerfiedOwners);
router
  .route("/restaurants").get(getRestaurants)

module.exports = router;
