///////////////////* SINE SECTION *////////////////////
//add in var amplitude, frequency, color so that it can make multiple color sine waves
function plotSine(ctx, xOffset, yOffset, amplitude, frequency, color) {
    var width = ctx.canvas.width * 8;
    var height = ctx.canvas.height/4;
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
let now = audioCtx.currentTime;

//frequency is passed to this function from input button
function startOsc(frequency) {

    oscillator.type = 'square'; //this can't be sine for some reason
    oscillator.frequency.value = frequency; //frequency val to be passed in on event click

    // oscillator.frequency.setValueAtTime(3000, audioCtx.currentTime); // value in hertz *** THIS MAKES IT INFLEXIBLE / NOT ABLE TO CHANGE THE FREQUENCY WITH THIS **** DONT USE ****

    oscillator.start(now);

    // Create GainNode	
    gain = audioCtx.createGain(); // Create gain node
    gain.gain.value = 0.5; // Set gain to half volume

    // Connect the Nodes
    oscillator.connect(gain); // Connect oscillator to gain
    gain.connect(audioCtx.destination); // Connect gain to output

    // // one context per document
    // var context = new (window.AudioContext || window.webkitAudioContext)();
    // var osc = context.createOscillator(); // instantiate an oscillator
    // osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
    // osc.frequency.value = 440; // Hz
    // osc.connect(context.destination); // connect it to the destination
    // osc.start(); // start the oscillator
}

// function playSound() {
//     source.start(context.currentTime); // play the source immediately
// }


//for turning off the oscillator
function stopOsc() {
    oscillator.stop(); // stop 2 seconds after the current time
    // stop 2 seconds after the current time // stop the source immediately
    // oscillator.stop(); //stop oscillator after 0 seconds
    oscillator.disconnect();  // disconnect oscillator
    console.log('off function called!')
}

///////////////////* MAPPING SECTION *////////////////////
//map pitch to color 
function mapPitchToColor(value, lowPitchFreq, highPitchFreq, lowColFreq, highColFreq) {
    let freqPitch = lowColFreq + (highColFreq - lowColFreq) * (value - lowPitchFreq) / (highPitchFreq - lowPitchFreq);
    return Math.floor(freqPitch);
}

//map for color
// linearly maps value from the range (a..b) to (c..d)
function mapRange(value, low1, high1, low2, high2) {
    let freqDrawValue = low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    return freqDrawValue;
    //console.log(freqDrawValue);
}

//////////////////////* TOGGLE SECTION *//////////////////////
//TOGGLE ON
function toggleOn(div, canvas) {
    div.addEventListener('mouseover', function () {
        console.log('mouse on!');
        canvas.style.visibility = 'visible';
    });
}

//TOGGLE OFF
function toggleOff(div, canvas) {
    div.addEventListener('mouseout', function () {
        console.log('mouse out!');
        canvas.style.visibility = 'hidden'; 
    });
}


///////////////////* LOAD SECTION */////////////////////
window.addEventListener('load', init);


///////////////////* FUNCTION INIT *////////////////////
function init() {

    //draw the frequency waves!
    drawFrequency();

    //get div + canvas id
    let redDiv = document.getElementById("red-div");
    let redCanvas = document.getElementById("canvas-red");
    let orangeDiv = document.getElementById("orange-div");
    let orangeCanvas = document.getElementById("canvas-orange");
    let yellowDiv = document.getElementById("yellow-div");
    let yellowCanvas = document.getElementById("canvas-yellow");
    let greenDiv = document.getElementById("green-div");
    let greenCanvas = document.getElementById("canvas-green");
    let cyanDiv = document.getElementById("cyan-div");
    let cyanCanvas = document.getElementById("canvas-cyan");
    let blueDiv = document.getElementById("blue-div");
    let blueCanvas = document.getElementById("canvas-blue");
    let purpleDiv = document.getElementById("purple-div");
    let purpleCanvas = document.getElementById("canvas-purple");

    //when mouse on color div - toggle on. when mouse out - toggle off
    redDiv.addEventListener('mouseover', toggleOn(redDiv, redCanvas));
    redDiv.addEventListener('mouseout', toggleOff(redDiv, redCanvas));

    orangeDiv.addEventListener('mouseover', toggleOn(orangeDiv, orangeCanvas));
    orangeDiv.addEventListener('mouseout', toggleOff(orangeDiv, orangeCanvas));

    yellowDiv.addEventListener('mouseover', toggleOn(yellowDiv, yellowCanvas));
    yellowDiv.addEventListener('mouseout', toggleOff(yellowDiv, yellowCanvas));
    greenDiv.addEventListener('mouseover', toggleOn(greenDiv, greenCanvas));
    greenDiv.addEventListener('mouseout', toggleOff(greenDiv, greenCanvas));
    cyanDiv.addEventListener('mouseover', toggleOn(cyanDiv, cyanCanvas));
    cyanDiv.addEventListener('mouseout', toggleOff(cyanDiv, cyanCanvas));
    blueDiv.addEventListener('mouseover', toggleOn(blueDiv, blueCanvas));
    blueDiv.addEventListener('mouseout', toggleOff(blueDiv, blueCanvas));
    purpleDiv.addEventListener('mouseover', toggleOn(purpleDiv, purpleCanvas));
    purpleDiv.addEventListener('mouseout', toggleOff(purpleDiv, purpleCanvas));

    /////////////* PLAY PITCH  *////////////
    //set up color + pitch frequency
    let lowColFreq = 400;
    let highColFreq = 789;
    let lowPitchFreq = 120;
    let highPitchFreq = 2000;

    //when mouse on red div - play red pitch
    redDiv.addEventListener('mouseover', function () {
        //map color red (avg col freq: 442) to pitch freq
        let rFreqPitch = Math.floor(mapRange(442, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
        console.log("red freq pitch: " + rFreqPitch);
        startOsc(rFreqPitch);

        redDiv.addEventListener('mouseout',stopOsc);
    });


    //when mouse on orange div - play orange pitch
    orangeDiv.addEventListener('mouseover', function () {
        //map color orange (avg col freq: 496) to pitch freq
        let oFreqPitch = Math.floor(mapRange(496, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
        console.log("orange freq pitch: " + oFreqPitch);
        startOsc(oFreqPitch);
    });

    //when mouse on yellow div - play yellow pitch
    yellowDiv.addEventListener('mouseover', function () {
        //map color yellow (avg col freq: 517) to pitch freq
        let yFreqPitch = Math.floor(mapRange(517, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
        console.log("yellow freq pitch: " + yFreqPitch);
        startOsc(yFreqPitch);
    });

    //when mouse on green div - play green pitch
    greenDiv.addEventListener('mouseover', function () {
        //map color green (avg col freq: 566) to pitch freq
        let gFreqPitch = Math.floor(mapRange(566, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
        console.log("green freq pitch: " + gFreqPitch);
        startOsc(gFreqPitch);
    });

    //when mouse on cyan div - play cyan pitch
    cyanDiv.addEventListener('mouseover', function () {
        //map color cyan (avg col freq: 618) to pitch freq
        let cFreqPitch = Math.floor(mapRange(618, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
        console.log("cyanfreq pitch: " + cFreqPitch);
        startOsc(cFreqPitch);
    });

    //when mouse on blue div - play blue pitch
    blueDiv.addEventListener('mouseover', function () {
        //map color blue (avg col freq: 649.5) to pitch freq
        let bFreqPitch = Math.floor(mapRange(649.5, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
        console.log("blue freq pitch: " + bFreqPitch);
        startOsc(bFreqPitch);
    });

    //when mouse on blue div - play blue pitch
    purpleDiv.addEventListener('mouseover', function () {
        //map color purple (avg col freq: 678.5) to pitch freq
        let pFreqPitch = Math.floor(mapRange(678.5, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
        console.log("purple freq pitch: " + pFreqPitch);
        startOsc(pFreqPitch);
    });

    // //when mouse out of any of the color div - stop osc sound
    // let allColorDiv = document.getElementsByClassName('color-div');
    // allColorDiv.addEventListener('mouseout', stopOsc);


    /////////////* PLOT SINE *////////////
    // need this function in here, so it will animate???
    function drawFrequency() {
        //get all canvas + context
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

        //set up frequency of color/light + frequency of wavelength drawn
        let lowFreq = 400;
        let highFreq = 789;
        let drawLowFreq = -20;
        let drawHighFreq = 80;

        //////////////////// RED FREQUENCY //////////////////
        rcontext.clearRect(0, 0, rcanvas.width, rcanvas.height);
        rcontext.imageSmoothingEnabled = true;

        //plot sine for red
        rcontext.save(); //push
        rcontext.translate(rcanvas.width / 0.575, 0); //translate 
        rcontext.rotate(Math.PI / 2); // rotate 90 degrees clockwise

        //avg frequency for red: 442
        //map red
        let rfreq = mapRange(442, lowFreq, highFreq, drawHighFreq, drawLowFreq);

        // when mouse on red, plot sine
        //rcanvas.addEventListener
        plotSine(rcontext, step, 30, 30, rfreq, "rgb(255,255,255)"); //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color) 
        rcontext.restore(); //pop

        //////////////////// ORANGE FREQUENCY //////////////////
        ocontext.clearRect(0, 0, ocanvas.width, ocanvas.height);
        ocontext.imageSmoothingEnabled = true;

        //plot sine for orange
        ocontext.save(); //push
        ocontext.translate(ocanvas.width / 0.575, 0); //translate 
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
        ycontext.translate(ycanvas.width / 0.575, 0, 0); //translate 
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
        gcontext.translate(gcanvas.width / 0.575, 0); //translate 
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

        //plot sine for cyan
        ccontext.save(); //push
        ccontext.translate(ccanvas.width / 0.575, 0); //translate 
        ccontext.rotate(Math.PI / 2); // rotate 90 degrees clockwise

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
        bcontext.translate(bcanvas.width / 0.575, 0); //translate 
        bcontext.rotate(Math.PI / 2); // rotate 90 degrees clockwise

        //avg frequency for blue: 649.5
        let bfreq = mapRange(649.5, lowFreq, highFreq, drawHighFreq, drawLowFreq);

        //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color) 
        plotSine(bcontext, step, 30, 30, bfreq, "rgb(255,255,255)");
        bcontext.restore(); //pop

        //////////////////// PURPLE FREQUENCY ////////////////
        pcontext.clearRect(0, 0, bcanvas.width, bcanvas.height);
        pcontext.imageSmoothingEnabled = true;

        //plot sine for blue
        pcontext.save(); //push
        pcontext.translate(pcanvas.width / 0.575, 0); //translate 
        pcontext.rotate(Math.PI / 2); // rotate 90 degrees clockwise

        //avg frequency for violet: 678.5
        let pfreq = mapRange(678.5, lowFreq, highFreq, drawHighFreq, drawLowFreq);

        //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color) 
        plotSine(pcontext, step, 30, 30, pfreq, "rgb(255,255,255)");

        pcontext.restore(); //pop

        step += 2; //changes the speed, like frame rate
        window.requestAnimationFrame(drawFrequency);
    }
}
var step = -2;


