//hhandle http requests
// HTTP Portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

    var parsedUrl = url.parse(req.url);
    console.log("The Request is: " + parsedUrl.pathname);

    fs.readFile(__dirname + parsedUrl.pathname,
        // Callback function for reading
        function (err, data) {
            // if there is an error
            if (err) {
                res.writeHead(500);
                return res.end('Error loading ' + parsedUrl.pathname);
            }
            // Otherwise, send the data, the contents of the file
            res.writeHead(200);
            res.end(data);
        }
    );

    /*
    res.writeHead(200);
    res.end("Life is wonderful");
    */
}


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
    // We are given a websocket object in our function
    function (socket) {

        console.log("We have a new client: " + socket.id);

        // // When this user emits, client side: socket.emit('otherevent',some data);
        // socket.on('chatmessage', function(data) {
        // 	// Data comes in as whatever was sent, including objects
        // 	console.log("Received: 'chatmessage' " + data);

        // 	// Send it to all of the clients
        // 	socket.broadcast.emit('chatmessage', data);
        // });

        socket.on('imagedata', function (thedata) {
            console.log(thedata);

            // Saving a data URL (server side)
            var searchFor = "data:image/jpeg;base64,"; //turn base64 data into binary //turns it inoto a binary object
            var strippedImage = data.slice(data.indexOf(searchFor) + searchFor.length);
            var binaryImage = new Buffer(strippedImage, 'base64'); //convert to binary data for us, which is how images need to be saved
            fs.writeFileSync(__dirname + '/theimage.jpg' + Date.now() +'.jpg', binaryImage); //synchronous 
        });


        socket.on('disconnect', function () {
            console.log("Client has disconnected " + socket.id);
        });
    }
);


////
