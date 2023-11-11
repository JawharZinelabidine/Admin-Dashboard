const express = require("express");
const router = express.Router();

const {
  getPendingRestaurants,
  getVerfiedOwner,
  reviewRestaurantRequest,
} = require("../controller/admin");

router
  .route("/restaurants")
  .get(getPendingRestaurants)
  .post(reviewRestaurantRequest);

router.route("/owners/:id").get(getVerfiedOwner);

module.exports = router;
