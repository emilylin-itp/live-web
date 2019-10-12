///////////////////* SINE SECTION *////////////////////
//add in var amplitude, frequency, color so that it can make multiple color sine waves
function plotSine(ctx, xOffset, yOffset, amplitude, frequency, color) {
    var width = ctx.canvas.width+1024;
    var height = ctx.canvas.height/2;
    // var scale = 120; //not sure where this is used
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;

    console.log("yOffset: " + yOffset);

    var x = 0;
    var y = 0;
    var amplitude = amplitude;
    var frequency = frequency;

    while (x < width) {
        y = height / 2 + amplitude * Math.sin((x + xOffset) / frequency);
        ctx.lineTo(x, y);
        x++;
        // console.log("x="+x+" y="+y);
    }
    ctx.stroke();
    ctx.save(); //push
    //console.log("Drawing point at y=" + y);
    ctx.stroke();
    ctx.restore(); //pop
}

function drawPurple() {
    let canvas = document.getElementById("canvas-purple");
    let context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    //plot sine for purple
    context.save(); //push
    context.translate(canvas.width/2 + 250, canvas.height/2 - canvas.height/2); //translate 
    context.rotate(Math.PI / 2); // rotate 90 degrees clockwise

    plotSine(context, step, 50, 40, 5, "rgb(255,255,255)"); //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color)

    context.restore(); //pop
    step += 1; //changes the speed, like frame rate
    window.requestAnimationFrame(drawPurple);
}

///////////////////* SOUND SECTION *////////////////////
// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
var oscillator = audioCtx.createOscillator();

//frequency is passed to this function from input button
function startOsc(frequency) {

    oscillator.type = 'square'; //this can't be sine for some reason
    oscillator.frequency.setValueAtTime(3000, audioCtx.currentTime); // value in hertz
    oscillator.start(0);

    // Create GainNode	
    gain = audioCtx.createGain(); // Create gain node
    gain.gain.value = 1; // Set gain to full volume

    // Connect the Nodes
    oscillator.connect(gain); // Connect oscillator to gain
    gain.connect(audioCtx.destination); // Connect gain to output
}

//for turning off the oscillator
function off() {
    oscillator.stop(); //stop oscillator after 0 seconds
    oscillator.disconnect();  // disconnect oscillator
    console.log('off function called!')
}


///////////////////* LOAD SECTION *////////////////////
window.addEventListener('load', init);

/// FUNCTION INIT //
function init() {
    window.requestAnimationFrame(drawPurple);
}
var step = -1;
