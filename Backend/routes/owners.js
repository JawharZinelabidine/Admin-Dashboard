const express = require('express');
const router = express.Router();


const {getOwners } = require('../controller/owners');

router.route('/')
    .get(getOwners)

module.exports = router;