///////////////////* SINE SECTION *////////////////////
//add in var amplitude, frequency, color so that it can make multiple color sine waves
function plotSine(ctx, xOffset, yOffset, amplitude, frequency, color) {
    var width = ctx.canvas.width * 8;
    var height = ctx.canvas.height / 2;
    // var scale = 120; //not sure where this is used
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;

    //console.log("yOffset: " + yOffset);

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

    drawFrequency();

    // all color frequencies included
    function drawFrequency() {
        //GET ALL CANVAS IDS
        let bcanvas = document.getElementById("canvas-blue");
        let bcontext = bcanvas.getContext("2d");
        let pcanvas = document.getElementById("canvas-purple");
        let pcontext = pcanvas.getContext("2d");

        //////////// BLUE FREQUENCY //////////
        bcontext.clearRect(0, 0, bcanvas.width, bcanvas.height);
        bcontext.imageSmoothingEnabled = true;

        //plot sine for blue
        bcontext.save(); //push
        bcontext.translate(bcanvas.width / 2 + bcanvas.width * 1.18, 0); //translate 
        bcontext.rotate(Math.PI / 2); // rotate 90 degrees clockwise

        step += 2; //changes the speed, like frame rate

        //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color) 
        plotSine(bcontext, step, 30, 30, 10, "rgb(255,255,255)");
        bcontext.restore(); //pop


        //////////// PURPLE FREQUENCY //////////
        pcontext.clearRect(0, 0, bcanvas.width, bcanvas.height);
        pcontext.imageSmoothingEnabled = true;

        //plot sine for blue
        pcontext.save(); //push
        pcontext.translate(pcanvas.width / 0.575, pcanvas.height/20); //translate 
        pcontext.rotate(Math.PI / 2); // rotate 90 degrees clockwise

        step += 2; //changes the speed, like frame rate

        //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color) 
        plotSine(pcontext, step, 30, 30, 10, "rgb(255,255,255)");

        pcontext.restore(); //pop


        window.requestAnimationFrame(drawFrequency);
    }
}
var step = -2;



///////////////* DUMPSTER CODE *//////////////
// function drawPurple() {
//     let canvas = document.getElementById("canvas-purple");
//     let context = canvas.getContext("2d");

//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.imageSmoothingEnabled = true;

//     //plot sine for purple
//     context.save(); //push
//     context.translate(canvas.width / 2 + canvas.width * 1.18, 0); //translate 
//     context.rotate(Math.PI / 2); // rotate 90 degrees clockwise

//     step += 4; //changes the speed, like frame rate
//     plotSine(context, step, 30, 45, 12, "rgb(255,255,255)"); //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color)

//     context.restore(); //pop
//     // step += 1; //changes the speed, like frame rate
//     window.requestAnimationFrame(drawPurple);
// }

// function drawFrequency(context, step, yOffset, amplitude, frequency, color) {

//     plotSine(context, step, yOffset, amplitude, frequency, color); //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color)
//     window.requestAnimationFrame(plotSine);
// }

// function drawFrequency() {
//     let canvas = document.getElementById("canvas-purple");
//     let context = canvas.getContext("2d");

//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.imageSmoothingEnabled = true;

//     //plot sine for purple
//     context.save(); //push
//     context.translate(canvas.width / 2 + canvas.width * 1.18, 0); //translate 
//     context.rotate(Math.PI / 2); // rotate 90 degrees clockwise

//     step += 4; //changes the speed, like frame rate
//     plotSine(context, step, 30, canvas.width / 5, 10, "rgb(255,255,255)"); //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color)

//     context.restore(); //pop
//     // step += 1; //changes the speed, like frame rate
//     window.requestAnimationFrame(drawFrequency);
// }
