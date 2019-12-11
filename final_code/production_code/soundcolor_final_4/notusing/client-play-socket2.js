window.addEventListener('load', init);


//////////////// INIT ///////////////
function init() {
    ///////////////////////CONNECT TO SOCKET//////////////////
    //socket connection
    var socket = io.connect();

    socket.on('connect', function () {
        console.log("Connected");
    });

    // x mark in bottom container
    let bottomX = document.getElementById('bottom-div-x');
    bottomX.addEventListener('click', () => {
        toggleBottom();
        console.log('x clicked!');
    });


    ///////////////////* DRAW SINE */////////////////////////////
    function drawSineTest(context) {
        // var canvas = setupCanvas("draw-canvas");
        let canvas = document.getElementById("draw-canvas");
        var context = canvas.getContext("2d");
        // let context = canvas.getContext('2d').scale(2,2);

        context.save(); //push
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;


        plotSine(context, step, 0.25, 2, 2, "rgb(148, 3, 252)"); //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color)

        context.restore(); //pop
        step += 1; //changes the speed, like frame rate
        window.requestAnimationFrame(drawSineTest);
    }

    window.requestAnimationFrame(drawSineTest);
}
var step = -1;



///////////////////* TOGGLE BOTTOM BAR */////////////////////////////
// toggle the bottom palette bar
function toggleBottom() {

    let bottomContainer = document.getElementById('bottom-container');
    let bottomX = document.getElementById('bottom-x');
    let instructionText = document.getElementById('bottom-instruction-text');
    let paletteContainer = document.getElementById('bottom-palette-container');
    let bottomPlus = document.getElementById('bottom-plus');

    if (bottomX.style.visibility === 'hidden') {
        bottomX.style.visibility = 'visible';
        bottomContainer.style.bottom = '-64vh';
        instructionText.innerHTML = '1. Select color <br/> 2. Click above to draw.';
        paletteContainer.style.visibility = 'visible';
        bottomPlus.style.visibility = 'hidden';
        console.log('show x and color palette');
    } else {
        bottomX.style.visibility = 'hidden';
        bottomContainer.style.bottom = '-72vh';
        instructionText.innerHTML = 'Choose Colors';
        paletteContainer.style.visibility = 'hidden';
        bottomPlus.style.visibility = 'visible';
        console.log('hide x and color palette')
    }
};


///////////////////* SOUND SECTION */////////////////////////////
// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
var oscillator; // = audioCtx.createOscillator();
// let now = audioCtx.currentTime;

//frequency is passed to this function from input button
function startOsc(frequency) {
    oscillator = audioCtx.createOscillator(); //create oscillator each time function runs

    oscillator.type = 'square'; //this can't be sine for some reason
    oscillator.frequency.value = frequency; //frequency val to be passed in on event click
    // oscillator.frequency.setValueAtTime(3000, audioCtx.currentTime); // value in hertz *** THIS MAKES IT INFLEXIBLE / NOT ABLE TO CHANGE THE FREQUENCY WITH THIS **** DONT USE ****

    oscillator.start(audioCtx.currentTime);

    // Create GainNode	
    gain = audioCtx.createGain(); // Create gain node
    gain.gain.value = 0.5; // Set gain to half volume

    // Connect the Nodes
    oscillator.connect(gain); // Connect oscillator to gain
    gain.connect(audioCtx.destination); // Connect gain to output
    // stop 2 seconds after the current time
    oscillator.stop(audioCtx.currentTime + 1.01);
}


/////////////// PLOT SINE /////////////////
function plotSine(ctx, xOffset, yOffset, amplitude, frequency, color) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    console.log('width: ' + width);
    console.log('height: ' + height);

    ctx.fillStyle = "rgba(255, 255, 255, 100)"; //opaque white

    // var scale = 120; //not sure where this is used
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';

    ctx.stroke();
    ctx.save();

    var x = 20;
    var y = 0;
    var amplitude = amplitude;
    var frequency = frequency;
    // var amplitude = 40;
    // var frequency = 20;

    //ctx.moveTo(x, y);
    // ctx.moveTo(x, 50);
    while (x < width / 4) {
        y = height / 2 + amplitude * Math.sin((x + xOffset) / frequency);
        ctx.lineTo(Math.round(x), Math.round(y));
        x++;
        // console.log("x="+x+" y="+y);
    }

    //console.log("Drawing point at y=" + y);
    // drawPoint(ctx, y);
    ctx.stroke();
    ctx.restore();
}

