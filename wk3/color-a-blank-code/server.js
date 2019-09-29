const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

function onConnection(socket) {
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

// io.on('connection', onConnection);

//array of all lines drawn
let lineHistory = [];


//event handler for new incoming connections
io.on('connection', function (socket) {

    //first send the history to the new client
    for (let i in lineHistory) {
        socket.emit('drawLine', {
            line: lineHistory[i]
        });
    }
    //add handler for message type "drawLine"
    socket.on('drawLine', function (data) {
        //add received line to history
        lineHistory.push(data.line);

        //send line to all clients
        io.emit('drawLine', { 
            line: data.line,
            color: data.color 
        });
    });

    // clear lineHistory array when clear function is called on client side!
    socket.on('clear', function(data){
        lineHistory = [];
    })

});



http.listen(port, () => console.log('listening on port ' + port));

