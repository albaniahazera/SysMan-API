const si = require('systeminformation');

exports.sys_status = (async (req, res) => {
    try {
        const [cpu, memory, os_info, disk] = await Promise.all([
            si.currentLoad(),
            si.mem(),
            si.osInfo(),
            si.fsSize()
        ]);

        res.json({
            cpu_load: cpu.currentLoad.toFixed(2),
            os_distro: os_info.distro,
            memory_usage: {
                total: (memory.total / (1024 ** 3)).toFixed(2),
                free: (memory.free / (1024 ** 3)).toFixed(2),
                used: ((memory.total - memory.free) / (1024 ** 3)).toFixed(2)
            },
            disk_usage: disk.map(d => ({
                fs: d.fs,
                used: (d.used / (1024 ** 3)).toFixed(2),
                free: ((d.size - d.used) / (1024 ** 3)).toFixed(2),
                size: (d.size / (1024 ** 3)).toFixed(2)
            }))
        });
    } catch (error) {
        console.error('Error retrieving system data:', error.message);
        res.status(500).json({ error: 'Failed to retrieve system data' });
    }
})

