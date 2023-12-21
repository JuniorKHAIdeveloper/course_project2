const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const {
  authAdmin,
} = require("../handlers/iot");

router.post("/app/room", async (req, res) => {
  const { userId, name, image } = req.body;
  const room = {
    name,
    image,
    devices: [],
  };

  try {
    const user = await User.findOne({ userId });
    if (user && req.cookies.jwttoken === user.token) {
      await User.updateOne({ userId }, { $push: { rooms: room } });
    } else {
      throw new Error();
    }
    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.post("/app/room/devices", async (req, res) => {
  const { userId, roomId, devices } = req.body;

  try {
    const user = await User.findOne({ userId });
    if (user && req.cookies.jwttoken === user.token) {
      user.rooms = user.rooms.map((room) => {
        if (room._id == roomId) {
          console.log("found");
          return {
            ...room,
            devices: devices,
          };
        } else {
          return room;
        }
      });
      await user.save();
    } else {
      throw new Error();
    }
    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

async function fetchTelemetry(jwttoken, devicesIds, devicesKeys) {
  const now = Date.now();

  // Create an array of promises for each device ID
  const promises = devicesIds.map(async (deviceId) => {
    const apiUrl = `http://localhost:8080/api/plugins/telemetry/DEVICE/${deviceId}/values/timeseries?keys=${devicesKeys.join(
      ","
    )}&startTs=${now - 100000}&endTs=${now}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          "X-Authorization": `Bearer ${jwttoken}`,
          "Content-Type": "application/json",
          // Add any other headers as needed
        },
      });
      const data = await response.json();
      // console.log(data)
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
    console.log(deviceId);
    // const apiUrl = `http://localhost:8080/api/deviceProfile/devices/keys/timeseries?deviceProfileId=${deviceId}`;
    const apiUrl = `http://localhost:8080/api/plugins/telemetry/DEVICE/${deviceId}/keys/timeseries`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          "X-Authorization": `Bearer ${jwttoken}`,
          "Content-Type": "application/json",
          // Add any other headers as needed
        },
      });
      const data = await response.json();
      // console.log(data)
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

router.get("/app/room/devices/telemetry/", async (req, res) => {
  const { userId, roomId } = req.query;

  let roomDevicesIds;
  // get list of devices
  try {
    const user = await User.findOne({ userId });
    console.log(user);
    if (user && req.cookies.jwttoken === user.token) {
      roomDevicesIds = user.rooms.find((room) => room._id == roomId).devices;
    }
    console.log(roomDevicesIds);
  } catch (e) {
    console.log(e);
  }

  const devicesKeys = await fetchDevicesKeys(roomDevicesIds);
  const devicesKeysArray = devicesKeys.flat();
  console.log(devicesKeysArray);

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Content-Encoding": "none",
    "Connection": "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  const firstData = await fetchTelemetry(
    req.cookies.jwttoken,
    roomDevicesIds,
    devicesKeysArray
  );

  res.write(`data: ${JSON.stringify(firstData)}\n\n`); // res.write() instead of res.send()

  let interValID = setInterval(async () => {
    const data = await fetchTelemetry(
      req.cookies.jwttoken,
      roomDevicesIds,
      devicesKeysArray
    );

    res.write(`data: ${JSON.stringify(data)}\n\n`); // res.write() instead of res.send()
  }, 5000);

  // If client closes connection, stop sending events
  res.on("close", () => {
    console.log("SSE - closed");
    clearInterval(interValID);
    res.end();
  });
});

router.post("/app/rooms", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findOne({ userId });
    if (user && req.cookies.jwttoken === user.token) {
      res.send(user.rooms);
    } else {
      throw new Error();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.delete("/app/room", async (req, res) => {
  const { userId, roomId } = req.body;
console.log(req.body)
  try {
    const user = await User.findOne({ userId });
    if (user && req.cookies.jwttoken === user.token) {
      const filteredRooms = user.rooms.filter((room) => room._id != roomId)
      user.rooms = filteredRooms;
      console.log(filteredRooms)
      await user.save();
    } else {
      throw new Error();
    }
    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
