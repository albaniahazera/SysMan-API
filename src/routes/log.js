const express = require('express');
const router = express.Router();
const validate_api_key = require('../middleware/check_api_key');
const {
    check_log_file,
    read_log_file 
} = require('../controllers/execute_commands');
const check_service = require('../middleware/check_service');

router.post("/nginx/check-log-file", check_service('check-nginx-log-file'), validate_api_key, check_log_file);
router.post("/nginx/read-log-file", check_service('read-nginx-log-file'), validate_api_key, read_log_file);

module.exports = router;