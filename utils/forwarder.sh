#!/bin/bash

# Define the path to the Nginx configuration file.
NGINX_CONFIG_PATH="/etc/nginx/sites-available/default"

# Check if a target server is provided.
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 [target_server_url]"
    exit 1
fi

TARGET_SERVER="$1"

# Validate the input.
if [[ ! $TARGET_SERVER =~ ^http(s)?:// ]]; then
    echo "Invalid URL. Please make sure it starts with http:// or https://"
    exit 1
fi

# Backup the original configuration file.
cp $NGINX_CONFIG_PATH "$NGINX_CONFIG_PATH.bak"

# Check for existing proxy_pass to the same target server.
if grep -q "proxy_pass $TARGET_SERVER;" $NGINX_CONFIG_PATH; then
    echo "Configuration already exists for this target server. Exiting."
    exit 1
fi

# Append the new configuration.
cat >> $NGINX_CONFIG_PATH <<EOL

server {
    listen 80;

    location / {
        proxy_pass $TARGET_SERVER;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

EOL

echo "Configuration added. Reloading Nginx..."

# Reload Nginx to apply the changes.
if sudo systemctl reload nginx; then
    echo "Nginx reloaded successfully!"
else
    echo "Failed to reload Nginx. Please check the configuration and try again."
    # Restore the backup in case of errors.
    cp "$NGINX_CONFIG_PATH.bak" $NGINX_CONFIG_PATH
    echo "Original configuration restored."
fi
