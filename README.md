# Nginx Installation Script

This repository contains a bash script (`install.sh`) for automating the compilation and installation of Nginx from source in a user's home directory.

## Prerequisites

- A Unix-based system with a shell environment
- `sudo` access (for installing prerequisite packages)
- `wget` installed

## Getting Started

1. **Clone the Repository**:

    Clone this repository to your local machine:

    ```bash
    git clone https://github.com/abdellahi-brahim/nginx.git
    cd nginx
    ```

2. **Grant Execution Permissions**:

    Before running the script, ensure it has the necessary execute permissions:

    ```bash
    chmod +x install.sh
    ```

3. **Run the Installation Script**:

    Execute the installation script:

    ```bash
    ./install.sh
    ```

    The script will handle the downloading, extraction, configuration, compilation, and installation of Nginx in your home directory.

4. **Verify Installation**:

    After the installation is complete, you can check the version of Nginx:

    ```bash
    $HOME/nginx/sbin/nginx -v
    ```

## Issues and Contributions

If you encounter any issues or would like to contribute improvements to the script, please open an issue or submit a pull request.
