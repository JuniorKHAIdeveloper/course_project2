const mqtt = require('mqtt');
var dhcp = require('dhcp');
 
var s = dhcp.createClient({mac: "11:22:33:44:55:66"});
 
s.on('bound', function (state) {
 
  console.log("State: ", state);
 
  // Configure your host system, based on the current state:
  // `ip address add IP/MASK dev eth0`
  // `echo HOSTNAME > /etc/hostname && hostname HOSTNAME`
  // `ip route add default via 192.168.1.254`
  // `sysctl -w net.inet.ip.forwarding=1`
 
});
 
s.listen();
 
s.sendDiscover();

// // MQTT broker connection settings
// const brokerUrl = 'mqtt://localhost'; // Replace with your MQTT broker URL
// const topic = 'temperature'; // The MQTT topic to publish to

// // Create an MQTT client
// const client = mqtt.connect(brokerUrl);

// // Function to publish random temperature data
// function publishTemperature() {
//   const temperature = Math.floor(Math.random() * 100); // Generate random temperature data
//   const message = JSON.stringify({ temperature: temperature });

//   client.publish(topic, message);
//   // console.log(`Published: ${message}`);
// }

// // Connect to the MQTT broker
// client.on('connect', () => {
//   console.log('Connected to MQTT broker');
  
//   // Publish random temperature data every 5 seconds
//   setInterval(publishTemperature, 5000);
// });
