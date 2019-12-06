//////*  HTTPS SECTION *///////
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
httpServer.listen(8099);

console.log('Server listening on port 8099');


////////////////*  WEB SOCKET PORTION *////////////////
// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
    // We are given a websocket object in our function
    function (socket) {

        // print client socket id
        console.log("We have a new client: " + socket.id);

        // //add handler for message type "drawLine" ; socket.on means server is lestneing 
        // socket.on('drawRedLine', function (data){
        //     //emit info to other users 
        //     socket.emit('drawRedLine', data); 
        // });

        //array for drawing sine waves
        var dataToDraw = [];

        //listen for red Data, then emit red Data
        socket.on('sendRedData', function (data) {
            io.sockets.emit('sendRedData', data);
            console.log('server received red data: ' + data);
        });

        // //listen for orange Data, then emit orange Data
        socket.on('sendOrangeData', function (data) {
            io.sockets.emit('sendOrangeData', data);
            console.log('server received orange data: ' + data);
        });

        //listen for yellow Data, then emit yellow Data
        socket.on('sendYellowData', function (data) {
            io.sockets.emit('sendYellowData', data);
            console.log('server received yellow data: ' + data);
        });

        //listen for green Data, then emit green Data
        socket.on('sendGreenData', function (data) {
            io.sockets.emit('sendGreenData', data);
            console.log('server received green data: ' + data);
        });

        //listen for cyan Data, then emit cyan Data
        socket.on('sendCyanData', function (data) {
            io.sockets.emit('sendCyanData', data);
            console.log('server received cyan data: ' + data);
        });

        //listen for blue Data, then emit blue Data
        socket.on('sendBlueData', function (data) {
            io.sockets.emit('sendBlueData', data);
            console.log('server received blue data: ' + data);
        });

        //listen for purple Data, then emit blue Data
        socket.on('sendPurpleData', function (data) {
            io.sockets.emit('sendPurpleData', data);
            console.log('server received purple data: ' + data);
        });

        // clear lineHistory array when clear function is called on client side!
        socket.on('clear', function (data) {
            console.log('clearing');
            io.sockets.emit('clear', data);
        })

        socket.on('disconnect', function () {
            console.log("Client has disconnected");
        });
    }
);

