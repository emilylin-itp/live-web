// Trying to refactor code from previous to fit the example on live web: https://itp.nyu.edu/~sve204/liveweb_fall2019/week3.html



document.addEventListener("DOMContentLoaded", function () {

    var socket = io.connect();

    socket.on('connect', function () {
        console.log("Connected");
    });

    // Receive from any event
    socket.on('othermouse', function (data) {
        console.log(data.x + " " + data.y);
        odraw(data.x, data.y);
    });

    let sendmouse = function (xval, yval) {
        console.log("sendmouse: " + xval + " " + yval);
        socket.emit('othermouse', { x: xval, y: yval });
    };

    ///////////////

    // get canvas element and create context
    let canvas;
    let context;
    canvas = document.getElementById('mycanvas');
    context = canvas.getContext('2d');

    context.fillStyle = "white";
    context.globalAlpha = 0.1;
    context.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener('mousemove', function (evt) {
        console.log("mousemove " + evt.clientX + " " + evt.clientY);

        //evt.clientX is x but in the entire window, not the canvas
        //evt.clientY i sy

        //get the canvas bounding rect
        var canvasRect = canvas.getBoundingClientRect();

        //calculate mouse positon values
        y = evt.clientY - canvasRect.top; // minus the starting point of the canvas rect
        x = evt.clientX - canvasRect.left // minus the starting point of the canvas rect on the x axis

        console.log("mousemove x: " + x + "y: " + y);
        sendmouse(x, y);
        draw(x, y);
    }, false);

    let px = 0;
    let py = 0;

    let draw = function (xval, yval) {
        console.log("draw " + xval + " " + yval);

        context.beginPath();
        context.strokeStyle = '#000000';

        context.moveTo(px, py);
        context.lineTo(xval, yval);
        context.stroke();

        px = xval;
        py = yval;
    };
    var opx = 0;
    var opy = 0;

    var odraw = function(xval, yval){
        console.log("draw "+ xval + " "+ yval);
        
        context.beginPath();
        context.strokeStyle = '#000000';

        context.moveTo(opx,opy);
        context.lineTo(xval, yval);
        context.stroke();

        opx = xval;
        opy = yval;
    };
});
