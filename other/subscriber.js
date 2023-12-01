var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost:1883");
client.on("connect", function () {
  client.subscribe("temperature");
});

client.on("message", function (topic, message) {
  context = message.toString();
  console.log(context);
});
