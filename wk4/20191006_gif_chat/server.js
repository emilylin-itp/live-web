// // Create server
// let port = process.env.PORT || 5500;
// let express = require('express');
// let app = express();
// let server = require('http').createServer(app).listen(port, function() {
//   console.log('Server listening at port: ', port);
// });

// // Tell server where to look for files
// app.use(express.static('public'));

var https = require('https');
var fs = require('fs'); // Using the filesystem module
var url = require('url');

var options = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-cert.pem')
};

function handleIt(req, res) {
  var parsedUrl = url.parse(req.url);

  var path = parsedUrl.pathname;
  if (path == "/") {
    path = "index.html";
  }

  fs.readFile(__dirname + path,

    // Callback function for reading
    function (err, fileContents) {
      // if there is an error
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + req.url);
      }
      // Otherwise, send the data, the contents of the file
      res.writeHead(200);
      res.end(fileContents);
    }
  );

  // Send a log message to the console
  console.log("Got a request " + req.url);
}

var httpServer = https.createServer(options, handleIt);
httpServer.listen(8083);

console.log('Server listening on port 8083');

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);

// //SOCKET CONNECTION + ROOMS
// // Create socket connection
// let io = require('socket.io').listen(server);

// Get the array of rooms
let rooms = io.sockets.adapter.rooms;
let roomNum = 0;
// How many in a group? Default is 2
let NUM_PARTNERS = 2;


// Listen for clients to connect
io.sockets.on('connection',

  function (socket) {
    console.log('An input client connected: ' + socket.id);

    // Join a room
    joinRoom(socket);

    socket.on('username', function (senderUsername) {

      let room = socket.room;
      let data = senderUsername;
      // console.log(data);
      let members = rooms[room].sockets;
      // console.log(members);
      let sender = socket.id;
      // console.log('sender: ' + sender);
      let receiver;
      for (member in members) {
        if (member != sender) {
          receiver = member;
          // console.log('receiver: ' + receiver);
        }
      }

      // socket.to(room).emit('connectedUsername', data);
      socket.broadcast.to(receiver).emit('connectedUsername', data);
    });

    // listen for 'image' event then emit to other sockets
    socket.on('image', function (data) {
      let room = socket.room;
      // console.log(data);
      let members = rooms[room].sockets;
      // console.log(members);
      let sender = socket.id;
      // console.log('sender: ' + sender);
      let receiver;
      for (member in members) {
        if (member != sender) {
          receiver = member;
          // console.log('receiver: ' + receiver);
        }
      }

      socket.broadcast.to(receiver).emit('image', data);
    });

    socket.on('disconnect', function () {
      console.log("Client has disconnected " + socket.id);

      // Which room was this client in?
      let room = socket.room;
      // Tell others in room client has left
      if (rooms[room]) {
        socket.to(room).emit('leave room');
      }

    });
  });


// Join room
function joinRoom(socket) {
  // First, add client to incomplete rooms
  for (let r in rooms) {
    let room = rooms[r];
    if (room.isPrivate) {
      if (room.length < NUM_PARTNERS) {
        addSocketToRoom(socket, r);
        return;
      }
    }
  }

  // If there are no incomplete rooms, create new room and join it
  addSocketToRoom(socket, roomNum);
  roomNum++;
}

// Add client to room and record which room it was added to
function addSocketToRoom(socket, r) {
  socket.join(r);
  rooms[r].isPrivate = true;
  socket.room = r;
  console.log(rooms);
}


///* DUMPSTER */////
/*
// var https = require('https');
// var fs = require('fs'); // Using the filesystem module
// var url = require('url');

// var options = {
//   key: fs.readFileSync('my-key.pem'),
//   cert: fs.readFileSync('my-cert.pem')
// };

// function handleIt(req, res) {
//   var parsedUrl = url.parse(req.url);

//   var path = parsedUrl.pathname;
//   if (path == "/") {
//     path = "index.html";
//   }

//   fs.readFile(__dirname + path,

//     // Callback function for reading
//     function (err, fileContents) {
//       // if there is an error
//       if (err) {
//         res.writeHead(500);
//         return res.end('Error loading ' + req.url);
//       }
//       // Otherwise, send the data, the contents of the file
//       res.writeHead(200);
//       res.end(fileContents);
//     }
//   );

//   // Send a log message to the console
//   console.log("Got a request " + req.url);
// }

// var httpServer = https.createServer(options, handleIt);
// httpServer.listen(3000);

// console.log('Server listening on port 3000');
*/