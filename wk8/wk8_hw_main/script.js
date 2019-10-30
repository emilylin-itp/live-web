window.addEventListener('load', init);

//global var
let recButton;

let video;
let canvas;
let context;
let mouseX = 0;
let mouseY = 0;
let rangeValueRed;
let rangeValueBlue;

// this array will contain "chunks" of the video captured by the MediaRecorder
let chunks = [];
let mediaRecorder;

//socket io portion
let socket = io.connect();
socket.on('connect', function () {
    console.log('socket connected!')
});

//callback when doc is loaded
function init() {
    video = document.getElementById('thevideo');
    canvas = document.getElementById('thecanvas');

    // Constraints - what do we want?
    let constraints = {
        audio: false,
        video: true
    }

    // Prompt the user for permission, get the stream
    // promise is a fancier callback
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        /* Use the stream */

        // Give the MediaRecorder the stream to record
        // mediaRecorder = new MediaRecorder(stream);
        // setupMediaRecorder();

        // Attach to our video object
        video.srcObject = stream;

        // Wait for the stream to load enough to play
        video.onloadedmetadata = function (e) {
            console.log(e);
            video.play();
            setupCanvas();
        };
    })
        .catch(function (err) {
            /* Handle the error */
            alert(err);
        });

    // on click -- start recording 
    recButton = document.getElementById('rec-h2');
    recButton.addEventListener('click', startRecord);
}


function setupCanvas() {
    context = canvas.getContext('2d');

    let canvasStream = canvas.captureStream(10);
    mediaRecorder = new MediaRecorder(canvasStream);
    setupMediaRecorder(); 

    drawCanvas();
}



function drawCanvas() {
    //draw image onto canvas
    //syntax: void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    context.drawImage(video, 0, 0, video.width, video.height, 0, 0, canvas.width, canvas.height);


    // //get values for each slider
    rangeValueRed = document.getElementById('sliderRangeRed').value;
    // console.log('range value red: '+ rangeValueRed);
    
    rangeValueBlue = document.getElementById('sliderRangeBlue').value;
    // console.log('range value blue: '+ rangeValueBlue);

    // Get at pixel data   // p5js load pixel			
    var imageData = context.getImageData(0, 0, 1920, 1920);

    // iterate over all pixels
    for (var i = 0, n = imageData.data.length; i < n; i += 4) {

        // Get existing pixel data
        var red = imageData.data[i];
        var green = imageData.data[i + 1];
        var blue = imageData.data[i + 2];
        var alpha = imageData.data[i + 3];

        // Set new pixel data
        // imageData.data[i] = rangeValueRed; //slider controls red value
        imageData.data[i] = rangeValueRed; //slider controls green value
        imageData.data[i + 2] = rangeValueBlue; //slider controls blue value
        imageData.data[i + 3] = 255;
        // imageData.data[i + 4] = 1;
    }

    context.putImageData(imageData, 0, 0);

    //create a loop //animates
    requestAnimationFrame(drawCanvas);
}


function startRecord() {
    recButton = document.getElementById('rec-h2');
    recButton.fill = '#FF0000';
    console.log('start recording!');

    let theData = canvas.toDataURL('image/jpeg', 1);
    console.log(theData);
    socket.emit('imagedata', theData);

    console.log("starting recording!");

    // Start the MediaRecorder
    mediaRecorder.start();

    // After 2 seconds, stop the MediaRecorder
    setTimeout(function () {
        mediaRecorder.stop();
    }, 10000);

    console.log("recording stop!");
}


function setupMediaRecorder() {
    // This is an event listener for the "stop" event on the MediaRecorder
    // Probably should write it:
    // mediaRecorder.addEventListener('stop', function(e) { ... });    
    mediaRecorder.onstop = function (e) {
        console.log("stop");

        // Create a new video element on the page
        var video = document.createElement('video');
        video.controls = true;

        // Create a blob - Binary Large Object of type video/webm
        var blob = new Blob(chunks, { 'type': 'video/webm' });
        // Generate a URL for the blob
        var videoURL = window.URL.createObjectURL(blob);
        // Make the video element source point to that URL
        video.src = videoURL;

        // Put the video element on the page
        // document.body.appendChild(video);

        //blob is binary data
        socket.emit('video', blob);
    };

    // Another callback/event listener - "dataavailable"
    mediaRecorder.ondataavailable = function (e) {
        // console.log("data");
        // Whenever data is available from the MediaRecorder put it in the array
        chunks.push(e.data);
    };
}



///////* DUMPSTER CODE *////////

// window.addEventListener('click', function (e) {
//     // 7 is compression data
//     let theData = canvas.toDataURL('image/jpeg', 1);
//     console.log(theData);
//     socket.emit('imagedata', theData);

//     console.log("starting recording!");

//     // Start the MediaRecorder
//     mediaRecorder.start();

//     // After 2 seconds, stop the MediaRecorder
//     setTimeout(function () {
//         mediaRecorder.stop();
//     }, 10000);

//     console.log("recording stop!");
// });