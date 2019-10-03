// Trying to refactor code from previous to fit the example on live web: https://itp.nyu.edu/~sve204/liveweb_fall2019/week3.html

// Steps from Code and Coffee

//client side needs:
//1. resize the canvas to users screen
//2. connect to the server and raw lines for the "drawLine" messages
//3. on click the client should send a "drawLine" message to the server when we are moving the mouse.


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


/* WORKS! FROM COFFEE + CODE
// register mouse event handlers
canvas.onmousedown = function (e) { mouse.click = true; };
canvas.onmouseup = function (e) { mouse.click = false; };

canvas.onmousemove = function (e) {
    // normalize mouse position to range 0.0 - 1.0
    mouse.pos.x = e.clientX / width;
    mouse.pos.y = e.clientY / height;
    mouse.move = true;
};

// draw line received from server
socket.on('drawLine', function (data) {
    var line = data.line;
    context.beginPath();
    context.moveTo(line[0].x * width, line[0].y * height);
    context.lineTo(line[1].x * width, line[1].y * height);
    context.lineWidth = 7;
    context.lineCap = 'round';
    context.stroke();
});
*/


//function to clear canvas
// function emitAndCanvas() {
//     socket.emit('clear');
//     clearCanvas();
//     console.log('emitAndCanvas works!');
// }

// function clearCanvas() {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     console.log('clearCanvas works!');
// }


/*
//redo button clicked -> clear canvas
let redoButton = document.getElementById('redo');
redoButton.addEventListener('click', () => {
    console.log('redo button clicked!');
    emitAndCanvas();
    clearCanvas();
});

// this will handle the socket event and clears the canvas
socket.on('clear', clearCanvas);

*/

// main loop, running every 25ms
// function mainLoop() {
//     // check if the user is drawing
//     if (mouse.click && mouse.move && mouse.pos_prev) {
//         // send line to to the server
//         socket.emit('drawLine', {
//             line: [mouse.pos, mouse.pos_prev]
//         });
//         mouse.move = false;
//     }
//     mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };
//     setTimeout(mainLoop, 25);
// }
// mainLoop();

// });

/* WILL USE BUT JUST NEED TO FIGURE OTHER THINGS OUT FIRST
window.addEventListener('load', init);

function init() {

    //set up canvas
    let c = document.getElementById("mycanvas");
    let ctx = c.getContext("2d");

    //when take photo button is clicked download the image
    let photoButton = document.getElementById('photo-download');
    photoButton.addEventListener('click', downloadImage());
}


function downloadImage() {
    //set up canvas
    let c = document.getElementById("mycanvas");
    let ctx = c.getContext("2d");
    document.getElementById("photo-download").download = "image.png";
    document.getElementById("photo-download").href = document.getElementById("mycanvas").toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}
*/




////////* DUMPSTER CODE */////////


//     let canvas = document.getElementById("draw-canvas");
//     let context = canvas.getContext('2d');
// photoButton.addEventListener('click', function (e) {
//     photoButton.href = canvas.toDataURL();
//     photoButton.download = "mydrawing.png";
// }false);
// document.body.appendChild(photoButton);
    // var canvas = document.getElementById("mcanvas");
    // image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    // var link = document.createElement('a');
    // link.download = "my-image.png";
    // link.href = image;
    // link.click();

    // let context = canvas.getContext('2d');

    // let dataURL = canvas.toDataURL('image/png');
    // photoButton.src = dataURL;


    // window.open(canvas.toDataURL('image/png'));
    // let gh = canvas.toDataURL('png');

    // let a = document.createElement('a');
    // a.href = gh;
    // a.download = 'image.png';

    // let image = document.getElementById("draw-canvas").toDataURL("image/png");
    // window.open(canvas.toDataURL('image/png'));
    // let gh = canvas.toDataURL('png');

    // let a = document.createElement('a');
    // a.href = gh;
    // a.download = 'image.png';
    // a.click()

    // console.log('data url: ' + dataURL);
    // console.log('downloaded!')

// function downloadImage() {
//     // Dump the canvas contents to a file.
//     var canvas = document.getElementById("canvas");
//     canvas.toBlob(function (blob) {
//         saveAs(blob, "output.png");
//     }, "image/png");
// };
