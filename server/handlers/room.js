const { authAdmin } = require("./iot.js");

async function fetchTelemetry(jwttoken, devicesIds, devicesKeys) {
  const now = Date.now();

  // Create an array of promises for each device ID
  const promises = devicesIds.map(async (deviceId) => {
    const apiUrl = `http://localhost:8080/api/plugins/telemetry/DEVICE/${deviceId}/values/timeseries?keys=${devicesKeys.join(
      ","
    )}&startTs=${now - 50000}&endTs=${now}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          "X-Authorization": `Bearer ${jwttoken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(`Error fetching data for deviceId ${deviceId}:`, e);
      return { deviceId, error: e.message };
    }
  });

  // Use Promise.all to wait for all promises to resolve
  const results = await Promise.all(promises);

  return results;
}

async function fetchDevicesKeys(devicesIds) {
  const now = Date.now();
  const jwttoken = await authAdmin();

  // Create an array of promises for each device ID
  const promises = devicesIds.map(async (deviceId) => {
    const apiUrl = `http://localhost:8080/api/plugins/telemetry/DEVICE/${deviceId}/keys/timeseries`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          "X-Authorization": `Bearer ${jwttoken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(`Error fetching data for deviceId ${deviceId}:`, e);
      return { deviceId, error: e.message };
    }
  });

  // Use Promise.all to wait for all promises to resolve
  const results = await Promise.all(promises);

  return results;
}

module.exports = {
  fetchTelemetry,
  fetchDevicesKeys,
};
