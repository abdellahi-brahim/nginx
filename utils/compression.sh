#!/bin/bash

NGINX_SITE_CONFIG_PATH="/etc/nginx/sites-available/default"
NGINX_BACKUP_PATH="$NGINX_SITE_CONFIG_PATH.bak"

# Check if compression configuration already exists
check_existing_config() {
    if grep -q "gzip on;" $NGINX_SITE_CONFIG_PATH; then
        echo "Compression configuration already exists in $NGINX_SITE_CONFIG_PATH."
        exit 1
    fi
}

# Add compression configuration
add_compression_support() {
    # Backup the current site configuration
    cp $NGINX_SITE_CONFIG_PATH $NGINX_BACKUP_PATH

    # Append compression configuration to the site configuration
    cat >> $NGINX_SITE_CONFIG_PATH <<EOL

# Compression settings
gzip on;
gzip_disable "msie6";
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

EOL

    echo "Compression configuration added."
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
add_compression_support
test_nginx_config

echo "Compression configuration successfully added and tested!"
