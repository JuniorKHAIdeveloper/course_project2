const dhcpsocket = require('dhcpsocket');
const dgram = require('dgram');

const client = new dhcpsocket.DHCPClient();
const server = new dhcpsocket.DHCPServer();

const serverPort = 647;
const serverAddress = '192.168.1.1';
const clientPort = 443;
const clientAddress = '0.0.0.0';

const serverSocket = dgram.createSocket('udp4');
const clientSocket = dgram.createSocket('udp4');

serverSocket.bind(serverPort, serverAddress);
clientSocket.bind(clientPort, clientAddress);

server.on('request', (request) => {
  if (request.option(150)) {
    const ipAddress = '10.0.0.1';
    const port = 1024;
    const response = new dhcpsocket.DHCPMessage(request.transactionId);
    response.addOption(53, ipAddress);
    response.addOption(60, port);
    serverSocket.send(response.toBuffer(), request.address, request.port);
  }
});

clientSocket.on('message', (buffer) => {
  const message = new dhcpsocket.DHCPMessage(buffer);
  if (message.messageType === dhcpsocket.DHCPMessageType.DHCPOFFER) {
    const ipAddress = message.option(53);
    const port = message.option(60);
    console.log(`IP address: ${ipAddress}`);
    console.log(`Port: ${port}`);
  }
});

client.send({
  messageType: dhcpsocket.DHCPMessageType.DHCPREQUEST,
  transactionId: 0x12345678,
  options: [
    { code: 150, data: new Buffer('tftp-server'.toString('ascii')) },
  ],
}, serverAddress, serverPort);