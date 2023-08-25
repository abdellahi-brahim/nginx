#!/bin/bash

# Define the path to the Nginx configuration file.
NGINX_CONFIG_PATH="/etc/nginx/sites-available/default"

# Check if the Nginx configuration file exists.
if [[ ! -f $NGINX_CONFIG_PATH ]]; then
    echo "Error: Nginx configuration file not found at $NGINX_CONFIG_PATH."
    exit 1
fi

# Backup the original configuration file.
if ! cp $NGINX_CONFIG_PATH "$NGINX_CONFIG_PATH.bak"; then
    echo "Error: Failed to backup the Nginx configuration."
    exit 1
fi

# Function to validate a backend URL.
validate_backend() {
    local backend=$1
    if [[ ! $backend =~ ^http(s)?:// ]]; then
        echo "Invalid backend URL: $backend. Please ensure it starts with http:// or https://"
        exit 1
    fi
}

# Function to add a backend to the configuration.
add_backend() {
    local backend=$1
    validate_backend $backend
    grep -q "server $backend;" $NGINX_CONFIG_PATH || echo "    server $backend;" >> $NGINX_CONFIG_PATH
}

# Based on the user's choice, modify the Nginx configuration.
case $1 in
    "override")
        # Override the configuration with a new upstream block.
        cat > $NGINX_CONFIG_PATH <<EOL
upstream backend_servers {
}

server {
    listen 80;

    location / {
        proxy_pass http://backend_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOL
        shift
        for backend in "$@"; do
            add_backend $backend
        done
        ;;
    "append")
        # Check if the upstream block exists, if not add it.
        grep -q "upstream backend_servers" $NGINX_CONFIG_PATH || cat >> $NGINX_CONFIG_PATH <<EOL
upstream backend_servers {
}

EOL
        shift
        for backend in "$@"; do
            add_backend $backend
        done
        ;;
    *)
        echo "Usage: $0 [override|append] backend1 backend2 ..."
        exit 1
        ;;
esac

# Reload Nginx to apply the changes.
if ! sudo systemctl reload nginx; then
    echo "Error: Failed to reload Nginx. Please check the configuration and try again."
    # Restore the backup in case of errors.
    cp "$NGINX_CONFIG_PATH.bak" $NGINX_CONFIG_PATH
    echo "Original configuration restored."
    exit 1
fi

echo "Nginx configuration updated successfully!"
