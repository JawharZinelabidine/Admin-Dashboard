const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const isAuthenticated = require('../middlwares/isAuthenticated')

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

router.route("/:id")
  .get(isAuthenticated, getOne);

module.exports = router;
