const express = require("express");
const router = express.Router();

const {
  getPendingRestaurants,
  getVerfiedOwners,
  reviewRestaurantRequest,
} = require("../controller/admin");

router
  .route("/restaurants")
  .get(getPendingRestaurants)
  .post(reviewRestaurantRequest);

router.route("/owners").get(getVerfiedOwners);

module.exports = router;
