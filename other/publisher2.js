const dgram = require('dgram');
const socket = dgram.createSocket('udp4');
const serverAddress = '127.0.0.1'; // Replace with actual server IP address
const serverPort = 68; // Default DHCP server port

// Send DHCP discover message
const discoverMessage = Buffer.from(DHCP_DISCOVER_MESSAGE);
socket.send(discoverMessage, serverPort, serverAddress, (err) => {
  if (err) {
    console.error('Error sending DHCP discover message:', err);
    return;
  }

  console.log('DHCP discover message sent');
});

// Receive DHCP offer and acknowledgment messages
socket.on('message', (message, remoteInfo) => {
  const messageType = message.readUInt8(0);
  const ipAddress = message.readUInt32BE(16);
  const port = message.readUInt16BE(20);

  if (messageType === DHCP_OFFER_MESSAGE) {
    console.log('DHCP offer received:', { ipAddress, port });
  } else if (messageType === DHCP_ACK_MESSAGE) {
    console.log('DHCP acknowledgment received:', { ipAddress, port });
  }
});