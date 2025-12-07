const express = require('express');
const router = express.Router();
// const validate_api_key = require('../../check_api_key');
const { shutdown_system, restart_system, restart_jellyfin, update_system, upgrade_system } = require('../controllers/execute_commands');

router.get('/shutdown', shutdown_system);
router.get("/restart", restart_system);
router.get("/restart-jellyfin", restart_jellyfin);
router.get("/update", update_system);
router.get("/upgrade", upgrade_system);

module.exports = router;