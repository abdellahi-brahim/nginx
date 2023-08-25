#!/bin/bash

CERT_DIR="/etc/nginx/ssl"
NGINX_CONFIG_PATH="/etc/nginx/sites-available/default"

# Ensure the directory exists
mkdir -p $CERT_DIR

# Function to install provided certificates
install_provided() {
    local cert=$1
    local key=$2

    if [[ ! -f $cert ]] || [[ ! -f $key ]]; then
        echo "Error: Certificate or key file not found."
        exit 1
    fi

    cp $cert $CERT_DIR/nginx.crt
    cp $key $CERT_DIR/nginx.key
    echo "Provided certificate installed at $CERT_DIR."
}

# Function to setup certbot and obtain Let's Encrypt certificate
setup_certbot() {
    # Installation
    if ! command -v certbot &> /dev/null; then
        echo "Certbot is not installed. Installing..."
        sudo apt-get update
        sudo apt-get install software-properties-common
        sudo add-apt-repository universe
        sudo add-apt-repository ppa:certbot/certbot
        sudo apt-get update
        sudo apt-get install certbot python-certbot-nginx
    fi

    # Obtain and install the certificate
    sudo certbot --nginx
}

# Main logic based on user input
case $1 in
    "generate")
        setup_certbot
        ;;
    "install")
        if [[ -z "$2" ]] || [[ -z "$3" ]]; then
            echo "Usage: $0 install [path_to_certificate] [path_to_key]"
            exit 1
        fi
        install_provided $2 $3
        ;;
    *)
        echo "Usage:"
        echo "$0 generate                                      - Obtain a Let's Encrypt certificate using certbot."
        echo "$0 install [path_to_certificate] [path_to_key]   - Install provided certificate and key."
        exit 1
        ;;
esac
