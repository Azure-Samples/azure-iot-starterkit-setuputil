# azure-iot-starterkit-setuputil

This repository contains a simple Node.js application for setting the IoT device's IP address and status in its device twin tags. It will retry up to 5 times before exiting.

## Getting Started

### Prerequisites

- Node.js
- Docker

### Quickstart

1. git clone https://github.com/Azure-Samples/azure-iot-starterkit-setuputil.git
2. cd azure-iot-starterkit-setuputil
3. docker build -t azure-iot-starterkit-setuputil .
4. docker run -e "HUB_CONNECTION_STRING=<YOUR_HUB_CONNECTION_STRING>" -e "DEVICE_ID=<YOUR_DEVICE_ID>" -e "DEVICE_IP_ADDRESS=<YOUR_IP_ADDRESS>" -e "STATUS=<STATUS_STRING>" --rm azure-iot-starterkit-setuputil
