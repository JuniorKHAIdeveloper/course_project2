const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const {
  authAdmin,
} = require("../handlers/iot");
const {fetchTelemetry, fetchDevicesKeys} = require("../handlers/room")

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

router.get("/app/room/devices/telemetry/", async (req, res) => {
  const { userId, roomId } = req.query;

  let roomDevicesIds;
  // get list of devices
  try {
    const user = await User.findOne({ userId });
    if (user && req.cookies.jwttoken === user.token) {
      roomDevicesIds = user.rooms.find((room) => room._id == roomId).devices;
    }
  } catch (e) {
    console.log(e);
  }

  const devicesKeys = await fetchDevicesKeys(roomDevicesIds);
  const devicesKeysArray = devicesKeys.flat();

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

  res.write(`data: ${JSON.stringify(firstData)}\n\n`);

  let interValID = setInterval(async () => {
    const data = await fetchTelemetry(
      req.cookies.jwttoken,
      roomDevicesIds,
      devicesKeysArray
    );

    res.write(`data: ${JSON.stringify(data)}\n\n`);
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

  try {
    const user = await User.findOne({ userId });
    if (user && req.cookies.jwttoken === user.token) {
      const filteredRooms = user.rooms.filter((room) => room._id != roomId)
      user.rooms = filteredRooms;
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
