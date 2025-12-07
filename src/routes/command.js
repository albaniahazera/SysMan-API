const express = require('express');
const router = express.Router();
// const validate_api_key = require('../middleware/check_api_key');
const { shutdown_system, restart_system, restart_jellyfin, status_jellyfin, restart_nginx, status_nginx } = require('../controllers/execute_commands');

router.post('/shutdown', shutdown_system);
router.post("/restart", restart_system);
router.post("/restart-jellyfin", restart_jellyfin);
router.post("/status-jellyfin", status_jellyfin);
router.post("/restart-nginx", restart_nginx);
router.post("/status-nginx", status_nginx);

// optional
// router.post("/update", update_system);
// router.post("/upgrade", upgrade_system);

module.exports = router;