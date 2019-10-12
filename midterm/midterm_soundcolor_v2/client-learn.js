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


///////////////////* MAPPING SECTION *////////////////////
// linearly maps value from the range (a..b) to (c..d)
function mapRange(value, low1, high1, low2, high2) {
    let freqDrawValue = low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    return freqDrawValue;
    //console.log(freqDrawValue);
}

///////////////////* LOAD SECTION *////////////////////
window.addEventListener('load', init);

/// FUNCTION INIT //
function init() {

    drawFrequency();

    //when mouse on color div, make visible
    let redDiv = document.getElementById("red-div");
    let redCanvas = document.getElementById("canvas-red");

    redDiv.addEventListener('click', function(){
        console.log('mouse on red!');
        redCanvas.style.visibility = 'visible';
    });


    function drawFrequency() {
            //GET ALL CANVAS IDS
            let rcanvas = document.getElementById("canvas-red");
            let rcontext = rcanvas.getContext("2d");
            let ocanvas = document.getElementById("canvas-orange");
            let ocontext = ocanvas.getContext("2d");
            let ycanvas = document.getElementById("canvas-yellow");
            let ycontext = ycanvas.getContext("2d");
            let gcanvas = document.getElementById("canvas-green");
            let gcontext = gcanvas.getContext("2d");
            let ccanvas = document.getElementById("canvas-cyan");
            let ccontext = ccanvas.getContext("2d");
            let bcanvas = document.getElementById("canvas-blue");
            let bcontext = bcanvas.getContext("2d");
            let pcanvas = document.getElementById("canvas-purple");
            let pcontext = pcanvas.getContext("2d");

            //SET UP VARIABLES
            let lowFreq = 400;
            let highFreq = 789;
            let drawLowFreq = -5;
            let drawHighFreq = 50;

            //////////////////// RED FREQUENCY //////////////////
            rcontext.clearRect(0, 0, rcanvas.width, rcanvas.height);
            rcontext.imageSmoothingEnabled = true;

            //plot sine for red
            rcontext.save(); //push
            rcontext.translate(rcanvas.width / 2 + rcanvas.width * 1.2, 0); //translate 
            rcontext.rotate(Math.PI / 2); // rotate 90 degrees clockwise

            //avg frequency for red: 442
            //map yellow
            let rfreq = mapRange(442, lowFreq, highFreq, drawHighFreq, drawLowFreq);

            // WHEN MOUSE ON RED CANVAS, PLOT SINE
            //rcanvas.addEventListener
            plotSine(rcontext, step, 30, 30, rfreq, "rgb(255,255,255)"); //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color) 
            rcontext.restore(); //pop

            //////////////////// ORANGE FREQUENCY //////////////////
            ocontext.clearRect(0, 0, ocanvas.width, ocanvas.height);
            ocontext.imageSmoothingEnabled = true;

            //plot sine for orange
            ocontext.save(); //push
            ocontext.translate(ocanvas.width / 2 + ocanvas.width * 1.18, 0); //translate 
            ocontext.rotate(Math.PI / 2); // rotate 90 degrees clockwise

            //avg frequency for orange: 496
            //map orange
            let ofreq = mapRange(496, lowFreq, highFreq, drawHighFreq, drawLowFreq);

            //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color) 
            plotSine(ocontext, step, 30, 30, ofreq, "rgb(255,255,255)");
            ocontext.restore(); //pop

            //////////////////// YELLOW FREQUENCY //////////////////
            ycontext.clearRect(0, 0, ycanvas.width, ycanvas.height);
            ycontext.imageSmoothingEnabled = true;

            //plot sine for yellow
            ycontext.save(); //push
            ycontext.translate(ycanvas.width / 2 + ycanvas.width * 1.18, 0); //translate 
            ycontext.rotate(Math.PI / 2); // rotate 90 degrees clockwise

            //avg frequency for yellow: 517
            //map yellow
            let yfreq = mapRange(517, lowFreq, highFreq, drawHighFreq, drawLowFreq);

            //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color) 
            plotSine(ycontext, step, 30, 30, yfreq, "rgb(255,255,255)");
            ycontext.restore(); //pop

            //////////////////// GREEN FREQUENCY //////////////////
            gcontext.clearRect(0, 0, gcanvas.width, gcanvas.height);
            gcontext.imageSmoothingEnabled = true;

            //plot sine for green
            gcontext.save(); //push
            gcontext.translate(gcanvas.width / 2 + gcanvas.width * 1.18, 0); //translate 
            gcontext.rotate(Math.PI / 2); // rotate 90 degrees clockwise

            //step += 2; //changes the speed, like frame rate

            //avg frequency for green: 566
            let gfreq = mapRange(566, lowFreq, highFreq, drawHighFreq, drawLowFreq);;

            //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color) 
            plotSine(gcontext, step, 30, 30, gfreq, "rgb(255,255,255)");
            gcontext.restore(); //pop

            //////////////////// CYAN FREQUENCY //////////////////
            ccontext.clearRect(0, 0, ccanvas.width, ccanvas.height);
            ccontext.imageSmoothingEnabled = true;

            //plot sine for blue
            ccontext.save(); //push
            ccontext.translate(ccanvas.width / 2 + ccanvas.width * 1.18, 0); //translate 
            ccontext.rotate(Math.PI / 2); // rotate 90 degrees clockwise

            //step += 2; //changes the speed, like frame rate

            //avg frequency for cyan: 618
            let cfreq = mapRange(618, lowFreq, highFreq, drawHighFreq, drawLowFreq);

            //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color) 
            plotSine(ccontext, step, 30, 30, cfreq, "rgb(255,255,255)");
            ccontext.restore(); //pop

            //////////////////// BLUE FREQUENCY //////////////////
            bcontext.clearRect(0, 0, bcanvas.width, bcanvas.height);
            bcontext.imageSmoothingEnabled = true;

            //plot sine for blue
            bcontext.save(); //push
            bcontext.translate(bcanvas.width / 2 + bcanvas.width * 1.18, 0); //translate 
            bcontext.rotate(Math.PI / 2); // rotate 90 degrees clockwise

            //step += 2; //changes the speed, like frame rate

            //avg frequency for blue: 649.5
            let bfreq = mapRange(649.5, lowFreq, highFreq, drawHighFreq, drawLowFreq);;

            //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color) 
            plotSine(bcontext, step, 30, 30, bfreq, "rgb(255,255,255)");
            bcontext.restore(); //pop


            //////////////////// PURPLE FREQUENCY ////////////////
            pcontext.clearRect(0, 0, bcanvas.width, bcanvas.height);
            pcontext.imageSmoothingEnabled = true;

            //plot sine for blue
            pcontext.save(); //push
            pcontext.translate(pcanvas.width / 0.575, pcanvas.height / 20); //translate 
            pcontext.rotate(Math.PI / 2); // rotate 90 degrees clockwise

            step += 2; //changes the speed, like frame rate

            //avg frequency for violet: 678.5
            let pfreq = mapRange(678.5, lowFreq, highFreq, drawHighFreq, drawLowFreq);

            //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color) 
            plotSine(pcontext, step, 30, 30, pfreq, "rgb(255,255,255)");

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
