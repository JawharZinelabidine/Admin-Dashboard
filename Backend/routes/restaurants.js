const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const isAuthenticated = require('../middlwares/isAuthenticated')
const isOwnerAuthorized = require('../middlwares/isOwnerAuthorized')

const {
  getRestaurants,
  getOne,
  createRestaurant,
} = require("../controller/restaurants");

router.route("/")
  .get(getRestaurants)
  .post(
    upload.fields([
      { name: "mainImage", maxCount: 1 },
      { name: "menuImages" },
      { name: "extraImages" },
    ]), isAuthenticated,
    isOwnerAuthorized,
    createRestaurant
  );

router.route("/myRestaurant")
  .get(isAuthenticated, isOwnerAuthorized, getOne);

module.exports = router;
