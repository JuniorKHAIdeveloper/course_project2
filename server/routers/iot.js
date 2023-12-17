const express = require("express");
const {
  authAdmin,
  authUser,
  logoutUser,
  getUserData,
  getDevices,
  checkAndCreateCustomer,
  createUser,
  getUserActivationToken,
  setUserPassword,
  createDevice,
  assignDeviceToCustomer,
} = require("../handlers/iot");
const User = require("../models/user");
const router = new express.Router();


router.post("/iot/auth/login", async (req, res) => {
  try {
    const data = await authUser(req);
    const userData = await getUserData(data.token);
    const user = await User.findOne({ userId: userData.id.id });

    if (!user) {
      const initUser = new User({ userId: userData.id.id, token: data.token });
      await initUser.save();
      console.log("User - is created!");
    } else {
      await User.updateOne({ userId: userData.id.id }, { token: data.token });
    }

    res.cookie("jwttoken", data.token);
    res.status(200).send();
  } catch (error) {
    console.error("Error:", error);
    res.status(401).send();
  }
});

router.post("/iot/auth/logout", async (req, res) => {
  try {
    await logoutUser(req);
    res.cookie("jwttoken", "");
    res.status(200).send();
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send();
  }
});

// create user
router.post("/iot/user", async (req, res) => {
  try {
    // tenant auth
    const jwttoken = await authAdmin();
    // create customer
    const customer = await checkAndCreateCustomer(jwttoken);
    // create user
    const user = await createUser(req, jwttoken, customer);
    // get activation link
    const link = await getUserActivationToken(jwttoken, user);
    // get activation token from link
    const parsedUrl = new URL(link);
    const activateToken = parsedUrl.searchParams.get("activateToken");
    // set password to user
    const userData = await setUserPassword(req, jwttoken, activateToken);

    // res.cookie("jwttoken", userData.token);
    res.status(201).send();
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send();
  }
});

// get user data
router.get("/iot/auth/user", async (req, res) => {
  try {
    const data = await getUserData(req.cookies.jwttoken);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send();
    console.error("Error:", error);
  }
});

router.get("/iot/customer/deviceInfos", async (req, res) => {
  const { userId } = req.query;
  let devices, userDevices;
  try {
    devices = await getDevices(req);
    const user = await User.findOne({ userId });

    if (user && req.cookies.jwttoken === user.token) {
      userDevices = user.devices;
    } else {
      throw new Error();
    }

    const filteredDevices = devices.data.filter((device) =>
      userDevices.includes(device.id.id)
    );

    res.status(200).send(filteredDevices);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send();
  }
});

router.post("/iot/device-with-credentials", async (req, res) => {
  const { userId } = req.body;
  try {
    // get tenant access first
    // tenant auth
    const jwttoken = await authAdmin();
    // create device
    const deviceId = await createDevice(req, jwttoken);
    // save device to user app db
    const user = await User.findOne({ userId });
    if (user && req.cookies.jwttoken === user.token) {
      user.devices.push(deviceId);
      await user.save();
    } else {
      throw new Error();
    }
    // assign device to customer
    await assignDeviceToCustomer(req, jwttoken, deviceId);

    res.status(201).send();
  } catch (error) {
    console.error("Error:", error.message);
    res.status(401).send();
  }
});

module.exports = router;
