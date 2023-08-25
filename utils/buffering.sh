#!/bin/bash

NGINX_SITE_CONFIG_PATH="/etc/nginx/sites-available/default"
NGINX_BACKUP_PATH="$NGINX_SITE_CONFIG_PATH.bak"

# Check if buffering configuration already exists
check_existing_config() {
    if grep -q "proxy_buffering on;" $NGINX_SITE_CONFIG_PATH; then
        echo "Buffering configuration already exists in $NGINX_SITE_CONFIG_PATH."
        exit 1
    fi
}

# Add buffering configuration
add_buffering_support() {
    # Backup the current site configuration
    cp $NGINX_SITE_CONFIG_PATH $NGINX_BACKUP_PATH

    # Append buffering configuration to the site configuration
    cat >> $NGINX_SITE_CONFIG_PATH <<EOL

# Buffering settings
proxy_buffering on;
proxy_buffer_size 16k;
proxy_buffers 4 64k;
proxy_busy_buffers_size 128k;
proxy_temp_file_write_size 128k;

EOL

    echo "Buffering configuration added."
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
add_buffering_support
test_nginx_config

echo "Buffering configuration successfully added and tested!"
