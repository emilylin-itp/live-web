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

////////////////////////////MAIN FUNCTION////////////////////////////
function init() {

    let socket = io.connect();

    let mouse = {
        click: false,
        move: false,
        pos: { x: 0, y: 0 },
        pos_prev: false
    };

    // register mouse event handlers
    canvas.onmousedown = function (e) {
        mouse.click = true;
    };
    canvas.onmouseup = function (e) {
        mouse.click = false;
    };

    // canvas.onmousemove = function (e) {
    //     // normalize mouse position to range 0.0 - 1.0
    //     mouse.pos.x = e.clientX / width;
    //     mouse.pos.y = e.clientY / height;
    //     mouse.move = true;
    // };

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



    //////// canvas//////
    var canvas = document.getElementById("draw-canvas");
    var ctx = canvas.getContext("2d");
    //let rect = canvas.getBoundingClientRect();

    //resize canvas to be window width + height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    ///////////////// CLICK EVENT TO DRAW SINE WAVES ///////////////
    // canvas background color
    ctx.fillStyle = "rgba(255, 255, 255, 0)"; //placeholder pink

    //canvas size 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //set local and global current color variable
    let currentColor;
    //let globalColor;
    let evl = null;


    let redSelect = document.getElementById('red-play-div');
    redSelect.addEventListener('click', () => {
        colorToDraw('red');
        console.log(currentColor);
        if (evl != null) {
            canvas.removeEventListener('click', evl);
        }
        evl = drawRedSine;
        canvas.addEventListener('click', drawRedSine);
    });

    let orangeSelect = document.getElementById('orange-play-div');
    orangeSelect.addEventListener('click', () => {
        colorToDraw('orange');
        console.log(currentColor);
        if (evl != null) {
            canvas.removeEventListener('click', evl);
        }
        evl = drawOrangeSine;
        canvas.addEventListener('click', drawOrangeSine);
    });

    let yellowSelect = document.getElementById('yellow-play-div');
    yellowSelect.addEventListener('click', () => {
        colorToDraw('yellow');
        console.log(currentColor);
        if (evl != null) {
            canvas.removeEventListener('click', evl);
        }
        evl = drawYellowSine;
        canvas.addEventListener('click', drawYellowSine);
    });

    let greenSelect = document.getElementById('green-play-div');
    greenSelect.addEventListener('click', () => {
        colorToDraw('green');
        console.log(currentColor);
        if (evl != null) {
            canvas.removeEventListener('click', evl);
        }
        evl = drawGreenSine;
        canvas.addEventListener('click', drawGreenSine);
    });

    let cyanSelect = document.getElementById('cyan-play-div');
    cyanSelect.addEventListener('click', () => {
        colorToDraw('cyan');
        console.log(currentColor);
        if (evl != null) {
            canvas.removeEventListener('click', evl);
        }
        evl = drawCyanSine;
        canvas.addEventListener('click', drawCyanSine);
    });

    let blueSelect = document.getElementById('blue-play-div');
    blueSelect.addEventListener('click', () => {
        colorToDraw('blue');
        console.log(currentColor);
        if (evl != null) {
            canvas.removeEventListener('click', evl);
        }
        evl = drawBlueSine;
        canvas.addEventListener('click', drawBlueSine);
    });

    let purpleSelect = document.getElementById('purple-play-div');
    purpleSelect.addEventListener('click', () => {
        colorToDraw('purple');
        console.log(currentColor);
        if (evl != null) {
            canvas.removeEventListener('click', evl);
        }
        evl = drawPurpleSine;
        canvas.addEventListener('click', drawPurpleSine);
    });


    let colorToDraw = function (choice) {
        if (choice === 'red') {
            currentColor = 'redColor';
        } else if (choice === 'orange') {
            currentColor = 'orangeColor';
        } else if (choice === 'yellow') {
            currentColor = 'yellowColor';
        } else if (choice === 'green') {
            currentColor = 'greenColor';
        } else if (choice === 'cyan') {
            currentColor = 'cyanColor';
        } else if (choice === 'blue') {
            currentColor = 'blueColor';
        } else if (choice === 'purple') {
            currentColor = 'purpleColor';
        }
        // let newColor = currentColor;
        return currentColor;
    }

    ///////////////////////SOCKET PORTION//////////////////
    //socket connection
    // var socket = io.connect();

    socket.on('connect', function () {
        console.log("Connected");
    });

    //function to clear canvas
    function emitAndCanvas(data) {
        socket.emit('clear'); //send to server to clear
        clearCanvas(data);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    //redo button clicked -> clear canvas
    document.body.onkeyup = function (event) {
        if (event.keyCode == 32) {
            console.log('redo button clicked!');
            emitAndCanvas();
        }
    }

    /////!!!!! LISTEN FOR CLEAR CANVAS FROM SERVER !!!!!////
    socket.on('clear', clearCanvas);

    /////!!!!! LISTEN FOR DRAW SINE  !!!!!////
    // socket.on('drawing', onDrawSine);

    // socket.on('drawing', function (data) {
    //     let x = data.pageX - canvas.offsetLeft;
    //     let y = data.pageY - canvas.offsetTop;

    //     // console.log("x: " + x);
    //     // console.log("y: " + y);

    //     //draw line begins here
    //     ctx.save(); //push
    //     ctx.beginPath();
    //     //ctx.translate(canvas.width / 6, 0); //translate
    //     ctx.lineWidth = lineWidth;
    //     ctx.strokeStyle = color;
    //     ctx.lineCap = 'round';

    //     // var x = 0;
    //     // var y = 0;
    //     var amplitude = amplitudeSine;
    //     var frequency = frequency;

    //     //while x is a certain length, draw the sine wave
    //     while (x < wavelength) {
    //         z = y + amplitude * Math.sin((x + xOffset) / frequency);
    //         ctx.lineTo(x, z);
    //         x++;
    //         // console.log("x=" + x + " z=" + z);
    //     }
    //     ctx.stroke();
    //     ctx.restore(); //pop
    // });

    /////////////////// * ALL FUNCTIONS BELOW  *///////////////////

    /////////////////* PLOT SINE TEMPLATE *////////////
    //add in var amplitude, frequency, color so that it can make multiple color sine waves

    function plotSine(data, wavelength, amplitudeSine, frequency, color, lineWidth) {
        let x = data.pageX - canvas.offsetLeft;
        let y = data.pageY - canvas.offsetTop;

        // console.log("x: " + x);
        // console.log("y: " + y);

        //draw line begins here
        ctx.save(); //push
        ctx.beginPath();
        //ctx.translate(canvas.width / 6, 0); //translate
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';

        // var x = 0;
        // var y = 0;
        var amplitude = amplitudeSine;
        var frequency = frequency;

        //while x is a certain length, draw the sine wave
        while (x < wavelength) {
            z = y + amplitude * Math.sin((x + xOffset) / frequency);
            ctx.lineTo(x, z);
            x++;
            // console.log("x=" + x + " z=" + z);
        }
        ctx.stroke();
        ctx.restore(); //pop
    }


    //map for color wavelengths
    // linearly maps value from the range (a..b) to (c..d)
    function mapRange(value, low1, high1, low2, high2) {
        let freqDrawValue = low2 + (high2 - low2) * (value - low1) / (high1 - low1);
        return freqDrawValue;
        //console.log(freqDrawValue);
    }

    //set up frequency of color/light + frequency of wavelength drawn
    let lowFreq = 400;
    let highFreq = 789;
    let drawLowFreq = -20;
    let drawHighFreq = 80;

    let wavelength = canvas.width / 0.25;
    let amplitudeSine = 40;
    let lineWidth = 12;

    /////////////////* GET VARIABLE FOR FREQUENCY BY MAPPING *////////////

    //avg light spectrum frequency for red: 442
    //map red freq to wavelength to draw
    let rfreq = mapRange(442, lowFreq, highFreq, drawHighFreq, drawLowFreq);

    //avg frequency for orange: 496
    //map orange
    let ofreq = mapRange(496, lowFreq, highFreq, drawHighFreq, drawLowFreq);

    //avg frequency for yellow: 517
    //map yellow
    let yfreq = mapRange(517, lowFreq, highFreq, drawHighFreq, drawLowFreq);

    //avg frequency for green: 566
    //map green
    let gfreq = mapRange(566, lowFreq, highFreq, drawHighFreq, drawLowFreq);

    //avg frequency for cyan: 618
    //map cyan
    let cfreq = mapRange(618, lowFreq, highFreq, drawHighFreq, drawLowFreq);

    //avg frequency for blue: 649.5
    //map blue
    let bfreq = mapRange(649.5, lowFreq, highFreq, drawHighFreq, drawLowFreq);

    //avg frequency for purple: 678.5
    //map purple
    let pfreq = mapRange(678.5, lowFreq, highFreq, drawHighFreq, drawLowFreq);


    // //FUNCTION FOR DRAWING EACH COLOR SINE - SOCKETIO///
    // function onDrawRedSine(data) {
    //     //avg light spectrum frequency for red: 442
    //     //map red freq to wavelength to draw
    //     let wavelength = canvas.width / 0.25;
    //     let amplitudeSine = 40;
    //     let rfreq = mapRange(442, lowFreq, highFreq, drawHighFreq, drawLowFreq);
    //     let lineWidth = 12;

    //     plotSine(data, wavelength, amplitudeSine, rfreq, "#FD4F4F", lineWidth);
    // }


    ////////////////* FUNCTION FOR DRAWING EACH COLOR SINE *///////////

    function drawRedSine(event) {
        plotSine(event, wavelength, amplitudeSine, rfreq, "#FD4F4F", lineWidth);//function plotSine(data, wavelength, amplitudeSine, frequency, color, lineWidth) 
        playRedFreq(); //play red sound         
    }

    function drawOrangeSine(event) {
        plotSine(event, wavelength, amplitudeSine, ofreq, "#FF9D41", lineWidth);//function plotSine(data, wavelength, amplitudeSine, frequency, color, lineWidth) 
        playOrangeFreq(); //play orange sound   
    }

    function drawYellowSine(event) {
        plotSine(event, wavelength, amplitudeSine, yfreq, "#FBE11F", lineWidth);//function plotSine(data, wavelength, amplitudeSine, frequency, color, lineWidth) 
        playYellowFreq(); //play yellow sound  
    }

    function drawGreenSine(event) {
        plotSine(event, wavelength, amplitudeSine, gfreq, "#B6E836", lineWidth);//function plotSine(data, wavelength, amplitudeSine, frequency, color, lineWidth) 
        playGreenFreq(); //play green sound  
    }

    function drawCyanSine(event) {
        plotSine(event, wavelength, amplitudeSine, cfreq, "#1EDFBE", lineWidth);//function plotSine(data, wavelength, amplitudeSine, frequency, color, lineWidth) 
        playCyanFreq(); //play cyan sound  
    }

    function drawBlueSine(event) {
        plotSine(event, wavelength, amplitudeSine, bfreq, "#29ACFF", lineWidth);//function plotSine(data, wavelength, amplitudeSine, frequency, color, lineWidth) 
        playBlueFreq(); //play blue sound  
    }

    function drawPurpleSine(event) {
        plotSine(event, wavelength, amplitudeSine, pfreq, "#685CFF", lineWidth);//function plotSine(data, wavelength, amplitudeSine, frequency, color, lineWidth) 
        playPurpleFreq(); //play purple sound  
    }



    //////////////////////* PLAY PITCH  *///////////////////////////
    //set up color + pitch frequency
    let lowColFreq = 400;
    let highColFreq = 789;
    let lowPitchFreq = 120;
    let highPitchFreq = 2000;

    ///////////////// * FUNCTIONS FOR PLAYING EACH COLOR FREQ *//////////////
    function playRedFreq() {
        //map color red (avg col freq: 442) to pitch freq
        let rFreqPitch = Math.floor(mapRange(442, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
        console.log("red freq pitch: " + rFreqPitch);
        startOsc(rFreqPitch);
    }

    function playOrangeFreq() {
        //map color orange (avg col freq: 496) to pitch freq
        let oFreqPitch = Math.floor(mapRange(496, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
        console.log("orange freq pitch: " + oFreqPitch);
        startOsc(oFreqPitch);
    }

    function playYellowFreq() {
        //map color yellow (avg col freq: 517) to pitch freq
        let yFreqPitch = Math.floor(mapRange(517, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
        console.log("yellow freq pitch: " + yFreqPitch);
        startOsc(yFreqPitch);
    }

    function playGreenFreq() {
        //map color green (avg col freq: 566) to pitch freq
        let gFreqPitch = Math.floor(mapRange(566, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
        console.log("green freq pitch: " + gFreqPitch);
        startOsc(gFreqPitch);
    }

    function playCyanFreq() {
        //map color cyan (avg col freq: 618) to pitch freq
        let cFreqPitch = Math.floor(mapRange(618, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
        console.log("cyanfreq pitch: " + cFreqPitch);
        startOsc(cFreqPitch);
    }

    function playBlueFreq() {
        //map color blue (avg col freq: 649.5) to pitch freq
        let bFreqPitch = Math.floor(mapRange(649.5, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
        console.log("blue freq pitch: " + bFreqPitch);
        startOsc(bFreqPitch);
    }

    function playPurpleFreq() {
        //map color purple (avg col freq: 678.5) to pitch freq
        let pFreqPitch = Math.floor(mapRange(678.5, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
        console.log("purple freq pitch: " + pFreqPitch);
        startOsc(pFreqPitch);
    }

}


//////////////////* LOAD *///////////////
window.addEventListener('load', init);

