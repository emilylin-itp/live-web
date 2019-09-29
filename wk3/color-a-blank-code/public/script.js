// Steps from Code and Coffee

//client side needs:
//1. resize the canvas to users screen
//2. connect to the server and raw lines for the "drawLine" messages
//3. on click the client should send a "drawLine" message to the server when we are moving the mouse.


document.addEventListener("DOMContentLoaded", function () {

    var socket = io.connect();


    var mouse = {
        click: false,
        move: false,
        pos: { x: 0, y: 0 },
        pos_prev: false
    };
    // get canvas element and create context
    let canvas = document.getElementById('mycanvas');
    let context = canvas.getContext('2d');
    var width = window.innerWidth;
    var height = window.innerHeight;



    // set canvas to full browser width/height
    canvas.width = width;
    canvas.height = height;

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

    //function to clear canvas
    function emitAndCanvas() {
        socket.emit('clear');
        clearCanvas();
        console.log('emitAndCanvas works!');
    }

    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log('clearCanvas works!');
    }

    //redo button clicked -> clear canvas
    let redoButton = document.getElementById('redraw-div');
    redoButton.addEventListener('click', () => {
        console.log('redo button clicked!');
        emitAndCanvas();
        clearCanvas();
    });

    // this will handle the socket event and clears the canvas; server side will recieve clear
    socket.on('clear', clearCanvas);

    // main loop, running every 25ms
    function mainLoop() {
        // check if the user is drawing
        if (mouse.click && mouse.move && mouse.pos_prev) {
            // send line to to the server
            socket.emit('drawLine', {
                line: [mouse.pos, mouse.pos_prev]
            });
            mouse.move = false;
        }
        mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };
        setTimeout(mainLoop, 25);
    }
    mainLoop();

});

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
