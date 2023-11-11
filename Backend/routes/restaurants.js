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
  updloadRestaurantImages,
  deleteImageByProperty,
  updateImageByProperty,
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

router
  .route("/upload/:id")
  .post(
    upload.fields([
      { name: "mainImage", maxCount: 1 },
      { name: "menuImages" },
      { name: "extraImages" },
    ]),
    updloadRestaurantImages
  );
router.route("/:id/images").delete(deleteImageByProperty)
router.route("/:id/images").post(upload.fields([
    { name: 'newImageFile', maxCount: 1 },
  ]),updateImageByProperty) 

router.route("/myRestaurant")
  .get(isAuthenticated, isOwnerAuthorized, getOne);

module.exports = router;
