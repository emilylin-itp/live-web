const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

/////////// DONT THINK I NEED THIS //////////
// function onConnection(socket) {
//     socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
// }

// io.on('connection', onConnection);
/* ///////////////////////////////////// */


//array of all lines drawn
let lineHistory = [];
let pigeonLineHistory = [];
let pizzaLineHistory = [];

//event handler for new incoming connections
io.on('connection', function (socket) {

    //first send the history to the new client
    for (let i in lineHistory) {
        socket.emit('drawLine', lineHistory[i]);
    }

    //first send the history to the new client
    for (let i in pigeonLineHistory) {
        socket.emit('drawPigeonLine', pigeonLineHistory[i]);
    }

    //first send the history to the new client
    for (let i in pizzaLineHistory) {
        socket.emit('drawPizzaLine', pizzaLineHistory[i]);
    }

    //add handler for message type "drawLine"
    socket.on('drawLine', function (data) {
        //add received line to history
        lineHistory.push(data);
        //lineHistory.push(data.color);

        //send line to all clients
        io.emit('drawLine', data);
    });

    //add handler for message type "drawLine"
    socket.on('drawPigeonLine', function (data) {
        //add received line to history
        pigeonLineHistory.push(data);
        //lineHistory.push(data.color);

        //send line to all clients
        io.emit('drawPigeonLine', data);
    });

    //add handler for message type "drawLine"
    socket.on('drawPizzaLine', function (data) {
        //add received line to history
        pizzaLineHistory.push(data);
        //lineHistory.push(data.color);

        //send line to all clients
        io.emit('drawPizzaLine', data);
    });

    // clear lineHistory array when clear function is called on client side!
    socket.on('clear', function (data) {
        lineHistory = [];
    })

    // clear pigeonlineHistory array when clear function is called on client side!
    socket.on('pigeonclear', function (data) {
        pigeonLineHistory = [];
    })

    // clear pizzalineHistory array when clear function is called on client side!
    socket.on('pizzaclear', function (data) {
        pizzaLineHistory = [];
    })

});

// doesn't know which person

http.listen(port, () => console.log('listening on port ' + port));

