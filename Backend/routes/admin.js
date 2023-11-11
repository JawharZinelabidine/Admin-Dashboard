const express = require("express");
const router = express.Router();

const {
  getPendingRestaurants,
  getVerfiedOwner,
  reviewRestaurantRequest,
  getPendingRestaurant,
} = require("../controller/admin");

router
  .route("/restaurants")
  .get(getPendingRestaurants)
  .post(reviewRestaurantRequest);

router.route("/owners/:id").get(getVerfiedOwner);

router.route("/restaurant/:id").get(getPendingRestaurant);
module.exports = router;
