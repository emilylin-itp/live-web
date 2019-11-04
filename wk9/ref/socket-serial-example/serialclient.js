/*

	This Node script requires node-serialport and socket.io-client to be installed with NPM
	It is meant to be run on a computer with an arduino or other serial device and relays data to a remote server for broadcasting

*/

var SerialPort = require('serialport');
// CHANGE TO YOUR SERIAL PORT
var serialPort = new SerialPort("/dev/tty.usbmodem1421", {
  baudRate: 9600
});

var buffer = [];

serialPort.on("open", function () {
  console.log('open');

// CHANGE TO YOUR SERVER ADDRESS
  var socket = require('socket.io-client')('http://localhost:1025');
  socket.on('connect', function(){
  	 console.log("Socket COnnected");

  	 socket.on('click', function(data) {
  	 	console.log("Got a click");
  	 	serialPort.write(1);
  	 });

	  serialPort.on('data', function(data) {
	  	for (var i = 0; i < data.length; i++) {	
	    		console.log('data received: ' + data[i]);
	    		socket.emit('sensor',data[i]);
		}
	  });
  });
});
