const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);

// Listen on the MQTT port
const port = 1883; // You can change the port if needed
server.listen(port, () => {
  console.log('MQTT broker is up and running on port', port);
});

// Event handler for when a client connects
aedes.on('client', (client) => {
  console.log(`Client connected: ${client.id}`);
});

// Event handler for when a client publishes a message
aedes.on('publish', (packet, client) => {
  // if (packet.topic) {
  //   console.log(`Message from client: ${client ? client.id : 'unknown'}`);
  //   console.log(`Topic: ${packet.topic}`);
  //   console.log(`Payload: ${packet.payload.toString()}`);
  // }
});