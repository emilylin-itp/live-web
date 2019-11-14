var socket = io.connect();
			
socket.on('connect', function() {
    console.log("Connected");

    // Once we are connected, request the history
    socket.emit('history', null);
});

// Receive from any event
socket.on('chatmessage', function (data) {
    document.getElementById('messages').innerHTML = "" + data + "\n<br />"
+ "" + document.getElementById('messages').innerHTML;
});

var sendmessage = function(message) {
    console.log("chatmessage: " + message);
    socket.emit('chatmessage', message);
};