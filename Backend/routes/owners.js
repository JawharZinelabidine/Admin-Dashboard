const express = require("express");
const router = express.Router();

const isOwnerAuthenticated = require("../middlwares/isOwnerAuthenticated")

const {
  getOwners,
  createOwner,
  signin,
  verifyEmail,
} = require("../controller/owners");

router.route("/").get(getOwners).post(createOwner);

router.route("/home")
   .get(getOwners)

router.route("/signin").post(signin);
router.route("/verify/:token").post(verifyEmail);

module.exports = router;
