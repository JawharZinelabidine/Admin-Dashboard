const express = require("express");
const router = express.Router();

const { getOwners, createOwner, signin, verifyEmail } = require("../controller/owners");

router.route("/").get(getOwners).post(createOwner);

router.route("/home")
   .get(getOwners)

router.route("/signin").post(signin);
router.route("/verify/:token").get(verifyEmail);
module.exports = router;
