// Import the MQTT library
const mqtt = require("mqtt");

const hostname = "127.0.0.1";
const port = 1883;
const ACCESS_TOKEN = "DEVICE_2";

// Create an MQTT client
const client = mqtt.connect(`mqtt://${hostname}:${port}`, {
  username: ACCESS_TOKEN,
});

// Define the topic for temperature data
const topic = "v1/devices/me/telemetry";

function getRandomNumber(min, max) {
  // Calculate the range between min and max
  const range = max - min + 1;

  // Generate a random number between 0 and the range
  const random = Math.random() * range;

  // Add the minimum value to ensure the range is inclusive
  return Math.floor(random + min);
}

function publishHumidity() {
  const humidity = getRandomNumber(60, 80); // Generate random temperature data
  const message = JSON.stringify({ humidity: humidity });

  client.publish(topic, message);
}

// Connect to the MQTT broker
client.on("connect", () => {
  console.log("Connected to ThingsBoard");

  setInterval(publishHumidity, 5000);
});

// Handle any errors
client.on("error", (error) => {
  console.error(error);
});
