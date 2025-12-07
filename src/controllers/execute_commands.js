const { execSync} = require('child_process');

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

exports.update_system = (async (req, res) => {
    try {
        const options = {
            env: { ...process.env, DEBIAN_FRONTEND: 'noninteractive' },
            timeout: 60000, 
            stdio: 'pipe'
        };
        execSync('sudo apt update', options);
        res.json({ message: 'System update completed' });
    }catch (error) {
        let stderrOutput = error.stderr ? error.stderr.toString() : 'No stderr output.';
        console.error("System update failed:", error.message);
        res.status(500).json({ 
            error: 'Failed to update system', 
            details: stderrOutput.includes('password') ? 'SUDO NOPASSWD configuration failed or timeout exceeded.' : stderrOutput 
        });
        
    }
});

exports.upgrade_system = (async (req, res) => {
    try {
        const options = {
            env: { ...process.env, DEBIAN_FRONTEND: 'noninteractive' },
            timeout: 60000, 
            stdio: 'pipe'
        };
        execSync('sudo apt upgrade -y', options);
        res.json({ message: 'System upgrade completed' });
    }catch (error) {
        let stderrOutput = error.stderr ? error.stderr.toString() : 'No stderr output.';
        console.error("System upgrade failed:", error.message);
        res.status(500).json({ 
            error: 'Failed to upgrade system', 
            details: stderrOutput.includes('password') ? 'SUDO NOPASSWD configuration failed or timeout exceeded.' : stderrOutput 
        });
    }
});