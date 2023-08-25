#!/bin/bash

NGINX_SITE_CONFIG_PATH="/etc/nginx/sites-available/default"
NGINX_BACKUP_PATH="$NGINX_SITE_CONFIG_PATH.bak"

# Check if header modifications already exist
check_existing_config() {
    if grep -q "add_header X-My-Header" $NGINX_SITE_CONFIG_PATH; then
        echo "Header modification configuration already exists in $NGINX_SITE_CONFIG_PATH."
        exit 1
    fi
}

# Add header modifications
add_header_modifications() {
    # Backup the current site configuration
    cp $NGINX_SITE_CONFIG_PATH $NGINX_BACKUP_PATH

    # Append header modifications to the site configuration
    cat >> $NGINX_SITE_CONFIG_PATH <<EOL

# Header modifications
add_header X-My-Header "MyHeaderValue";
proxy_set_header X-Proxy-Header "ProxyHeaderValue";

EOL

    echo "Header modifications added."
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
add_header_modifications
test_nginx_config

echo "Header modifications successfully added and tested!"
