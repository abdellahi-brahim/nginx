#!/bin/bash

# Variables
NGINX_VERSION="1.19.0"
INSTALL_DIR="$HOME/nginx"

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
make install && \

# Print nginx version
$INSTALL_DIR/sbin/nginx -v

# If any command fails, the script will exit with a non-zero status
