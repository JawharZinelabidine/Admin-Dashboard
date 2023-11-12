const express = require("express");
const router = express.Router();

const {
  getPendingRestaurants,
  getVerifiedOwner,
  reviewRestaurantRequest,
  getPendingRestaurant,
} = require("../controller/admin");

router.route("/restaurants").get(getPendingRestaurants);

router.route("/owner/:id").get(getVerifiedOwner);

router
  .route("/restaurant/:id")
  .get(getPendingRestaurant)
  .post(reviewRestaurantRequest);
module.exports = router;
