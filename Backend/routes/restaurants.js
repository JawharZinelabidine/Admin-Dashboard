const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const {
  getRestaurants,
  getOne,
  createRestaurant,
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
    createRestaurant
  );

router.route("/:id").get(getOne);

module.exports = router;
