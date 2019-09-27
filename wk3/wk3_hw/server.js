var express = require('express');

var app = express();
var server = app.listen(8000);

app.use(express.static('public'));

console.log("My socket server is running!");

var socket = require('socket.io');

//controls message in and out
var io = socket(server);

//socket is a connection; function to handle event
io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log('new connection: ' + socket.id);
}