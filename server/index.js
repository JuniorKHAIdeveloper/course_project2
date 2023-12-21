const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const cookieParser = require("cookie-parser");
require("./db/mongoose");
const cors = require("cors");
const roomRouter = require("./routers/room");
const iotRouter = require("./routers/iot");
const https = require("https");
const fs = require("fs");

const app = express();

const options = {
  key: fs.readFileSync(path.resolve(__dirname, "example.com-key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "example.com.pem")),
};

const server = https.createServer(options, app);

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

// Middleware to check if cookies are empty
const checkCookiesMiddleware = (req, res, next) => {
  if (!req.cookies.jwttoken && req.path.includes('dashboard')) {
    console.log(req.path.includes('dashboard'))
    // Cookies are empty, respond with "Unauthorized"
    // return res.status(401).send('Unauthorized! Permission denied.');
    // return res.sendFile(path.join(__dirname, "../client/build","unauthorized.html"));
    return res.sendFile(path.join(__dirname, "../client/public", "unauthorized.html"));
  }
  next(); // Move to the next middleware or route handler
};

// Use the middleware before the route handler
app.use(checkCookiesMiddleware);

app.use(roomRouter);
app.use(iotRouter);

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, "../client/build")));

// redirect http to https
// app.use((req, res, next) => {
//   if (req.header('x-forwarded-proto') !== 'https') {
//     res.redirect(`https://${req.header('host')}${req.url}`);
//   } else {
//     next();
//   }
// });

if (process.env.MODE === "production") {
  // Handle other routes by serving the index.html file
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

server.listen(process.env.HTTPS_PORT, () => {
  console.log(
    `Server is running on https://localhost:${process.env.HTTPS_PORT}`
  );
});
