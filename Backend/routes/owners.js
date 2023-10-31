const express = require("express");
const router = express.Router();

const { getOwners, createOwner, signin } = require("../controller/owners");

router.route("/").get(getOwners).post(createOwner);
router.route("/signin").post(signin);

module.exports = router;
