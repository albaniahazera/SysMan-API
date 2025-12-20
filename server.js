require('dotenv').config();

const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const command_routes = require('./src/routes/command');
const system_routes = require('./src/routes/system');
const logs_routes = require('./src/routes/log');
const setup = require('./setup.js');
const os = require('os');
const config_watcher = require('./config/config_watcher');
const path = require('path');

(async() => {
  if (os.platform() != 'linux') {
    console.log('This application only supports Linux operating systems.');
    process.exit(1);
  }
  
  app.use(express.json());
  app.use(cors());
  
  if (fs.existsSync('./scripts/install.sh')) {
    await setup.setup();
    process.exit(0);
  }
  
  app.get('/', (req, res) => {
    res.send('API Running!');
  });

  app.use('/doc', express.static(path.join(__dirname, 'documentation')));
  app.get('/doc', (req, res) => {
    res.sendFile(path.join(__dirname, 'documentation', 'doc.html'));
  });
  
  app.use('/server/commands', command_routes);
  app.use('/server/systems', system_routes);
  app.use('/server/logs', logs_routes);

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`API Docs available at http://localhost:${port}/doc`);
    config_watcher.start_watcher();
  });
})();
