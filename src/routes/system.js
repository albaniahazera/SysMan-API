const express = require('express');
const router = express.Router();
// const validate_api_key = require('../../check_api_key');
const check_status = require('../controllers/check_status');

router.post('/', check_status.sys_status);

module.exports = router;