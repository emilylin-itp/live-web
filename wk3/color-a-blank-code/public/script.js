var socket = io.connect();

socket.on('connect', function () {
    console.log("Connected");
});

// Receive a message
socket.on('message', function (data) {
    console.log("Got: " + data);
    document.getElementById('messages').innerHTML += data;
});

socket.on("position", function (data) {
    console.log(data);
});

// Receive from any event
socket.on('news', function (data) {
    console.log(data);
});

// var sendmessage = function () {
//     var message = document.getElementById('message').value;
//     console.log("Sending: " + message);

//     // Send a messaage
//     socket.send(message);
// };

// var sendother = function () {
//     var othermessage = document.getElementById('message').value;
//     console.log("sending: " + othermessage);

//     // Send any kind of data with a custom event
//     //socket.emit('otherevent',{ othermessage: othermessage });
//     socket.emit('otherevent', othermessage);
// };

window.addEventListener('load', function () {
    window.addEventListener('mousemove', function (e) {
        console.log(e);
        let p = {
            x: e.pageX,
            y: e.pageY
        };

        socket.emit('position', p);

        // let p = new Object();
        // p.x = e.pageX;
        // p.y = e.pageY;

        // e.pageX
        // e.pageY
    });
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
