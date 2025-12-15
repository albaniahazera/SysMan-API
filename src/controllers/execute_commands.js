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

exports.status_jellyfin = (async (req, res) => {
    const command = 'systemctl';
    const args = ['status', 'jellyfin'];
    let output = "";
    let err_output = "";

    const process = spawn(command, args);

    process.stdout.on('data', (data) => {
        output += data.toString();
    })
    process.stderr.on('data', (data) => {
        err_output += data.toString();
    })

    process.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({
                succes: false,
                message: `Invalid command or service inactive (Code ${code})`,
                details: err_output || output
            });
        }
        res.status(200).json({ 
            success: true,
            service_name: 'nginx',
            full_status: output
        });
    })
    process.on('error', (err) => {
        res.status(500).json({ 
            success: false,
            message: 'Failed running command system.',
            details: err.message
        });
    });
});

exports.restart_nginx = (async (req, res) => {
    try {
        execSync('sudo systemctl restart nginx');
        res.json({ message: 'Nginx is restarting' });
    }catch (error) {
        console.error("Nginx restart failed:", error.message);
        res.status(500).json({ error: 'Failed to restart nginx' });
    }
});

exports.status_nginx = (async (req, res) => {
    const command = 'systemctl';
    const args = ['status', 'nginx'];
    let output = "";
    let err_output = "";

    const process = spawn(command, args);

    process.stdout.on('data', (data) => {
        output += data.toString();
    })
    process.stderr.on('data', (data) => {
        err_output += data.toString();
    })

    process.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({
                succes: false,
                message: `Invalid command or service inactive (Code ${code})`,
                details: err_output || output
            });
        }
        res.status(200).json({ 
            success: true,
            service_name: 'nginx',
            full_status: output
        });
    })
    process.on('error', (err) => {
        res.status(500).json({ 
            success: false,
            message: 'Failed running command system.',
            details: err.message
        });
    });
});
