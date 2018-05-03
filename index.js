const azureIot = require('azure-iothub');
const os = require('os');

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

function sendIpAddress() {
  return new Promise((resolve, reject) => {
    const hubConnectionString = process.env.HUB_CONNECTION_STRING;
    if (!hubConnectionString) {
      reject('HUB_CONNECTION_STRING is missing');
      return;
    }

    const deviceId = process.env.DEVICE_ID;
    if (!deviceId) {
      reject('DEVICE_ID is missing');
      return;
    }

    const status = process.env.STATUS || 'Unknown';

    const newTags = { status };

    const ipAddressLine = process.env.DEVICE_IP_ADDRESS;
    if (ipAddressLine) {
      const ipAddressParts = ipAddressLine.trim().split(/\//);
      const ipAddress = ipAddressParts[0].trim();
      newTags.ipAddress = ipAddress;

      if (status === 'Unknown') {
        newTags.status = 'Connected';
      }
    }

    console.log(`Sending tags: ${JSON.stringify(newTags)}`);
    const registry = azureIot.Registry.fromConnectionString(hubConnectionString);
    registry.getTwin(deviceId, (error, deviceTwin) => {
      if (error) {
        reject(error.message);
        return;
      }

      deviceTwin.update({ tags: newTags }, (updateError, updatedTwin) => {
        if (updateError) {
          reject(updateError.message);
          return;
        }

        resolve(updatedTwin);
      });
    });
  });
}

async function trySendIpAddress() {
  let updateSuccessful = false;
  let retries = 0;
  while (!updateSuccessful && retries < 5) {
    try {
      await sendIpAddress();
      updateSuccessful = true;
    } catch (error) {
      console.log(error);
      retries++;
      await sleep(1000);
    }
  }
}

trySendIpAddress();
