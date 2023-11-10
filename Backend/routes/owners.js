const express = require("express");
const router = express.Router();

const isAuthenticated = require('../middlwares/isAuthenticated')
const isOwnerAuthorized = require('../middlwares/isOwnerAuthorized')

const {
  getOneCustomers,
  getOwners,
  createOwner,
  signin,
  verifyEmail,
  removeNotification,
  checkNotification
} = require("../controller/owners");

router.route("/").get(getOwners).post(createOwner);
router.route("/customers/:customerId").get(isAuthenticated, isOwnerAuthorized, getOneCustomers)


router.route("/home")
  .get(isAuthenticated, getOwners)
router.route('/notification')
  .get(isAuthenticated, isOwnerAuthorized, checkNotification)
  .put(isAuthenticated, isOwnerAuthorized, removeNotification)
router.route("/signin").post(signin);
router.route("/verify/:token").post(verifyEmail);

module.exports = router;
