#!/bin/bash

NGINX_CONFIG_PATH="/etc/nginx/nginx.conf"  # Global config file, where cache settings are typically added
NGINX_SITE_CONFIG_PATH="/etc/nginx/sites-available/default"
NGINX_BACKUP_PATH="$NGINX_SITE_CONFIG_PATH.bak"

CACHE_DIR="/var/cache/nginx"

# Check if caching configuration already exists
check_existing_config() {
    if grep -q "proxy_cache_path $CACHE_DIR" $NGINX_CONFIG_PATH; then
        echo "Caching configuration already exists in $NGINX_CONFIG_PATH."
        exit 1
    fi
}

# Add caching configuration
add_caching_support() {
    # Backup the current site configuration
    cp $NGINX_SITE_CONFIG_PATH $NGINX_BACKUP_PATH

    # Append cache settings to nginx.conf
    echo "proxy_cache_path $CACHE_DIR levels=1:2 keys_zone=my_cache:10m max_size=10g inactive=60m use_temp_path=off;" | sudo tee -a $NGINX_CONFIG_PATH

    # Append caching configuration to the site configuration
    cat >> $NGINX_SITE_CONFIG_PATH <<EOL

location / {
    proxy_cache my_cache;
    proxy_pass http://backend;
    proxy_cache_valid 200 302 60m;
    proxy_cache_valid 404 1m;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
}

EOL

    echo "Caching configuration added."
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
add_caching_support
test_nginx_config

echo "Caching configuration successfully added and tested!"
