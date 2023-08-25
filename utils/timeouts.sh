#!/bin/bash

NGINX_SITE_CONFIG_PATH="/etc/nginx/sites-available/default"
NGINX_BACKUP_PATH="$NGINX_SITE_CONFIG_PATH.bak"

# Check if timeout configuration already exists
check_existing_config() {
    if grep -q "client_body_timeout" $NGINX_SITE_CONFIG_PATH; then
        echo "Timeout configuration already exists in $NGINX_SITE_CONFIG_PATH."
        exit 1
    fi
}

# Add timeout configuration
add_timeout_support() {
    # Backup the current site configuration
    cp $NGINX_SITE_CONFIG_PATH $NGINX_BACKUP_PATH

    # Append timeout configuration to the site configuration
    cat >> $NGINX_SITE_CONFIG_PATH <<EOL

# Timeout settings
client_body_timeout 12s;
client_header_timeout 12s;
send_timeout 10s;
keepalive_timeout 15s;

EOL

    echo "Timeout configuration added."
}

# Test the Nginx configuration
test_nginx_config() {
    if ! sudo nginx -t; then
        echo "Error in Nginx configuration."
        # Restore the backup configuration
        cp $NGINX_BACKUP_PATH $NGINX_SITE_CONFIG_PATH
        echo "Restored the original Nginx configuration from backup."
        exit 1
    fi

    # Optionally, you can reload Nginx here. Uncomment the next line if needed.
    # sudo systemctl reload nginx
}

# Main logic
check_existing_config
add_timeout_support
test_nginx_config

echo "Timeout configuration successfully added and tested!"
