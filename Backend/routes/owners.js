const express = require('express');
const router = express.Router();


const { createOwner } = require('../controller/owners');

router.route('/')
    .get()
    .post(createOwner)
module.exports = router;