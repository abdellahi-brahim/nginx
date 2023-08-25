#!/bin/bash

NGINX_CONFIG_PATH="/etc/nginx/sites-available/default"
NGINX_BACKUP_PATH="$NGINX_CONFIG_PATH.bak"

# Check if WebSocket configuration already exists
check_existing_config() {
    if grep -q "upgrade websocket;" $NGINX_CONFIG_PATH; then
        echo "WebSocket configuration already exists in $NGINX_CONFIG_PATH."
        exit 1
    fi
}

# Add WebSocket support configuration
add_websocket_support() {
    # Backup the current configuration
    cp $NGINX_CONFIG_PATH $NGINX_BACKUP_PATH

    # Append WebSocket configuration
    cat >> $NGINX_CONFIG_PATH <<EOL

location /websocket/ {
    proxy_pass http://backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
}

EOL

    echo "WebSocket configuration added to $NGINX_CONFIG_PATH."
}

# Test the Nginx configuration
test_nginx_config() {
    if ! sudo nginx -t; then
        echo "Error in Nginx configuration."
        # Restore the backup configuration
        cp $NGINX_BACKUP_PATH $NGINX_CONFIG_PATH
        echo "Restored the original Nginx configuration from backup."
        exit 1
    fi

    # Optionally, you can reload Nginx here. Uncomment the next line if needed.
    # sudo systemctl reload nginx
}

# Main logic
check_existing_config
add_websocket_support
test_nginx_config

echo "WebSocket configuration successfully added and tested!"
