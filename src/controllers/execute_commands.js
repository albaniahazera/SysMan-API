const { execSync, spawn } = require('child_process');

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
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    const update = spawn('sudo', ['-n' ,'apt', 'update', '-y']);

    try {
        update.stdout.on('data', (data) => {
            res.write(data.toString());
        });
        update.stderr.on('data', (data) => {
            console.error("Update process error:", data.toString());
            res.write(`ERROR: ${data.toString()}`);
        });
        update.on('close', (code) => {
            res.write(`\nUpdate process exited with code ${code}\n`);
            res.end();
        });
        update.on('error', (error) => {
            console.error("Update process failed:", error.message);
            res.write(`\nERROR: ${error.message}\n`);
            res.end();
        });
    }catch (error) {
        console.error("System update failed:", error.message);
        res.status(500).json({ error: 'Failed to update system' });
    }
})

exports.upgrade_system = (async (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    const upgrade = spawn('sudo', ['-n', 'apt', 'upgrade', '-y']);

    try {
        upgrade.stdout.on('data', (data) => {
            res.write(data.toString());
        });
        upgrade.stderr.on('data', (data) => {
            console.error("Upgrade process error:", data.toString());
            res.write(`ERROR: ${data.toString()}`);
        });
        upgrade.on('close', (code) => {
            res.write(`\nUpgrade process exited with code ${code}\n`);
            res.end();
        });
        upgrade.on('error', (error) => {
            console.error("Upgrade process failed:", error.message);
            res.write(`\nERROR: ${error.message}\n`);
            res.end();
        });
    }catch (error) {
        console.error("System upgrade failed:", error.message);
        res.status(500).json({ error: 'Failed to upgrade system' });
    }
})