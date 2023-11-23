const express = require("express");
const router = express.Router();
// const isAdminAuthorized = require("../middlwares/isAdminAuthorized");
// const isAuthenticated = require("../middlwares/isAuthenticated");


const {calculateStats,calculateRestaurantHistoryStats}=require('../controller/stats')


router.route('/')
    .get(calculateStats)
router.route('/historyStats')
    .get(calculateRestaurantHistoryStats)

module.exports = router;