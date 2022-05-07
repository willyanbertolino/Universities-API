const express = require('express');

const router = express.Router();

const {} = require('../controllers/universities');

router.route('/').get();

module.exports = router;
