#!/bin/bash

SERVICE_NAME="bot-server.service"
SUDOERS_CONFIG="/etc/sudoers.d/bot-server-config"

echo "UNINSTALL SCRIPT"
echo "Stopping and disabling ${SERVICE_NAME}..."
sudo systemctl stop "$SERVICE_NAME"
sudo systemctl disable "$SERVICE_NAME"

echo "Removing "$SERVICE_NAME" from /etc/systemd/system/..."
sudo rm /etc/systemd/system/"$SERVICE_NAME"

echo "Removing sudoers configuration file..."
if [ -f "$SUDOERS_CONFIG" ]; then
    sudo rm "$SUDOERS_CONFIG"
else
    echo "Sudoers configuration file not found, skipping..."
fi

echo "Reloading systemd daemon..."
sudo systemctl daemon-reload

echo "Uninstall Success, Service has been removed"