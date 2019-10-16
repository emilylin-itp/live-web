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
httpServer.listen(8087);

console.log('Server listening on port 8087');


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

        //add handler for message type "drawLine" ; socket.on means server is lestneing 
        socket.on('drawing', (data) => {
           //emit info to other users 
           socket.emit('drawing', data); 
           console.log('recieved drawing');
           console.log(data);
        });

        // clear lineHistory array when clear function is called on client side!
        socket.on('clear', (data) => {
            console.log('clear canvas')
            socket.emit('clear', data);
        });

        socket.on('disconnect', function () {
            console.log("Client has disconnected");
        });
    }
);

