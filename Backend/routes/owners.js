const express = require("express");
const router = express.Router();

const isAuthenticated = require('../middlwares/isAuthenticated')

const {
  getOwners,
  createOwner,
  signin,
  verifyEmail,
  removeNotification,
  checkNotification
} = require("../controller/owners");

router.route("/").get(getOwners).post(createOwner);

router.route("/home")
  .get(isAuthenticated, getOwners)
router.route('/notification/:id')
  .get(isAuthenticated, checkNotification)
  .put(isAuthenticated, removeNotification)
router.route("/signin").post(signin);
router.route("/verify/:token").post(verifyEmail);

module.exports = router;
