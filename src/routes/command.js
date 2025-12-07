const express = require('express');
const router = express.Router();
// const validate_api_key = require('../../check_api_key');
const { shutdown_system, restart_system, restart_jellyfin, update_system, upgrade_system } = require('../controllers/execute_commands');

router.post('/shutdown', shutdown_system);
router.post("/restart", restart_system);
router.post("/restart-jellyfin", restart_jellyfin);
router.post("/update", update_system);
router.post("/upgrade", upgrade_system);

module.exports = router;