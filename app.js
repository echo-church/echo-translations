let path = require('path');
let express = require('express');
let app = express(); // Create our app with express
let fs = require('fs');
let https = require('https');
let config = require('./config.json');

const ioServer = require('socket.io');
const RTCMultiConnectionServer = require('rtcmulticonnection-server');


// Listen (start app with node server.js)
let options = {
    key: fs.readFileSync('fake-keys/privatekey.pem'),
    cert: fs.readFileSync('fake-keys/certificate.pem')
};
httpApp = https.createServer(options, app).listen(9002);

ioServer(httpApp).on('connection', function (socket) {
    RTCMultiConnectionServer.addSocket(socket, {config: config});
});

app.use(express.static(__dirname + '/public')); // Set the static files location
console.log("App listening on port 9002");

app.get('/source-777-190310', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/source.html'));
});

app.get('/translator-190310-7', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/translator.html'));
});



app.get('/webrtc-adapter.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/node_modules/webrtc-adapter/out/adapter.js'));
});
