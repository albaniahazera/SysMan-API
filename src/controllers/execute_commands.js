const { execSync } = require('child_process');

exports.shutdown_system = (async (req, res) => {
    try {
        execSync('sudo shutdown now');
        res.json({ message: 'System is shutting down' });
    } catch (error) {
        console.error("Shutdown failed:", error.message);
        res.status(500).json({ error: 'Failed to shutdown system' });
    }
});

exports.restart_system = (async (req, res) => {
    try {
        execSync('sudo reboot');
        res.json({ message: 'System is restarting' });
    }catch (error) {
        console.error("Reboot failed:", error.message);
        res.status(500).json({ error: 'Failed to restart system' });
    }
});

exports.restart_jellyfin = (async (req, res) => {
    try {
        execSync('sudo systemctl restart jellyfin');
        res.json({ message: 'Jellyfin is restarting' });
    }catch (error) {
        console.error("Jellyfin restart failed:", error.message);
        res.status(500).json({ error: 'Failed to restart jellyfin' });
    }
});
