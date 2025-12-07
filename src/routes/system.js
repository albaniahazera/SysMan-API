const express = require('express');
const router = express.Router();
// const validate_api_key = require('../middleware/check_api_key');
const { sys_status } = require('../controllers/check_status');

router.post('/', sys_status);

module.exports = router;