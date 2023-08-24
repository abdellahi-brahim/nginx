#!/bin/bash

# Variables
NGINX_VERSION="1.19.0"
INSTALL_DIR="/home/abdellahi/Code/nginx"

# Ensure the script is run as root or with sudo
if [ "$(id -u)" -ne 0 ]; then
    echo "Please run as root or use sudo."
    exit 1
fi

# Check for required commands
command -v wget >/dev/null 2>&1 || { echo "wget is not installed. Aborting."; exit 1; }

# Update repositories and install required packages
sudo apt-get update && \
sudo apt-get install -y \
    linux-kernel-headers \
    build-essential \
    zlib1g-dev \
    libpcre3-dev && \

# Download and extract nginx
wget https://nginx.org/download/nginx-$NGINX_VERSION.tar.gz && \
tar zxf nginx-$NGINX_VERSION.tar.gz && \
cd nginx-$NGINX_VERSION && \

# Configure, compile and install nginx
./configure --prefix=$INSTALL_DIR && \
make && \
sudo make install && \

# Remove downloaded folders
cd .. && \
rm -rf nginx-$NGINX_VERSION nginx-$NGINX_VERSION.tar.gz && \

# Add sbin/nginx to system paths
echo "export PATH=\$PATH:$INSTALL_DIR/sbin" >> ~/.bashrc && \
source ~/.bashrc && \

# Print nginx version
$INSTALL_DIR/sbin/nginx -v

# Optional: Set up a systemd service for nginx
cat <<EOL | sudo tee /etc/systemd/system/nginx.service
[Unit]
Description=The NGINX HTTP and reverse proxy server
After=syslog.target network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
PIDFile=$INSTALL_DIR/logs/nginx.pid
ExecStartPre=$INSTALL_DIR/sbin/nginx -t
ExecStart=$INSTALL_DIR/sbin/nginx
ExecReload=$INSTALL_DIR/sbin/nginx -s reload
ExecStop=$INSTALL_DIR/sbin/nginx -s stop
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOL

sudo systemctl daemon-reload
