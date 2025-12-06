const express = require('express');
const router = express.Router();
// const validate_api_key = require('../../check_api_key');
const { shutdown_system, restart_system, restart_jellyfin } = require('../controllers/execute_commands');

router.get('/shutdown', shutdown_system);
router.get("/restart", restart_system);
router.get("/restart-jellyfin", restart_jellyfin);

module.exports = router;