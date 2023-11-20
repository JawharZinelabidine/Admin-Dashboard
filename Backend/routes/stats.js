const express = require("express");
const router = express.Router();
// const isAdminAuthorized = require("../middlwares/isAdminAuthorized");
// const isAuthenticated = require("../middlwares/isAuthenticated");


const {calculateStats}=require('../controller/stats')


router.route('/')
    .get(calculateStats)

module.exports = router;