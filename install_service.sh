#!/bin/bash

SERVICE_FILE_PATH="$1"
APP_USER=$(whoami)

echo "SETUP SCRIPT"
echo "WARN: This script requires SUDO privileges to run certain commands."
echo "Configuration sudoers for user: ${APP_USER}..."
echo "${APP_USER} ALL=(ALL) NOPASSWD: /sbin/shutdown, /sbin/reboot, /usr/bin/systemctl restart nginx, /usr/bin/systemctl restart jellyfin" | sudo tee /etc/sudoers.d/bot_server_config > /dev/null
echo "Copy file service..."
sudo cp "$SERVICE_FILE_PATH" /etc/systemd/system/bot_server.service

echo "Start Service..."
sudo systemctl daemon-reload
sudo systemctl enable bot_server.service
sudo systemctl start bot_server.service
echo "Setup Success, Service has been enabled"