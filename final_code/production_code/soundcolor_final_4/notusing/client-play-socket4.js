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


    // function plotSine(event, length, xOffset, yOffset, amplitude, frequency, color, lineWidth)

    let redSelect = document.getElementById('red-play-div');
    redSelect.addEventListener('click', () => {
        if (evl != null) {
            canvas.removeEventListener('click', evl);
        }
        evl = drawRedSine;
        canvas.addEventListener('click', (e) => {
            //drawRedSine;
            console.log(e);
            let p = {
                x: e.clientX,
                y: e.clientY
            };
            socket.emit('sendRedData', p);
        });
    });

    let orangeSelect = document.getElementById('orange-play-div');
    orangeSelect.addEventListener('click', () => {
        if (evl != null) {
            canvas.removeEventListener('click', evl);
        }
        evl = drawOrangeSine;
        canvas.addEventListener('click', (e) => {
            console.log(e);
            let p = {
                x: e.clientX,
                y: e.clientY
            };
            socket.emit('sendOrangeData', p);
        });
        // canvas.addEventListener('click', (e) => {
        //     //drawOrangeSine;
        //     console.log(e);
        //     socket.emit('sendOrangeData', e);
        //     //socket.removeListener('sendOrangeData', e);

        //     //drawOrangeSine(e);
        // });
    });

    let yellowSelect = document.getElementById('yellow-play-div');
    yellowSelect.addEventListener('click', () => {
        if (evl != null) {
            canvas.removeEventListener('click', evl);
        }
        evl = drawYellowSine;
        // canvas.addEventListener('click', drawYellowSine);
        canvas.addEventListener('click', (e) => {
            console.log(e);
            let p = {
                x: e.clientX,
                y: e.clientY
            };
            socket.emit('sendYellowData', p);
        });
    });

    let greenSelect = document.getElementById('green-play-div');
    greenSelect.addEventListener('click', () => {
        if (evl != null) {
            canvas.removeEventListener('click', evl);
        }
        evl = drawGreenSine;
        canvas.addEventListener('click', (e) => {
            console.log(e);
            let p = {
                x: e.clientX,
                y: e.clientY
            };
            socket.emit('sendGreenData', p);
        });
        // canvas.addEventListener('click', drawGreenSine);
    });

    let cyanSelect = document.getElementById('cyan-play-div');
    cyanSelect.addEventListener('click', () => {
        if (evl != null) {
            canvas.removeEventListener('click', evl);
        }
        evl = drawCyanSine;
        canvas.addEventListener('click', (e) => {
            console.log(e);
            let p = {
                x: e.clientX,
                y: e.clientY
            };
            socket.emit('sendCyanData', p);
        });
        // canvas.addEventListener('click', drawCyanSine);
    });

    let blueSelect = document.getElementById('blue-play-div');
    blueSelect.addEventListener('click', () => {
        if (evl != null) {
            canvas.removeEventListener('click', evl);
        }
        evl = drawBlueSine;
        canvas.addEventListener('click', (e) => {
    
            console.log(e);
            let p = {
                x: e.clientX,
                y: e.clientY
            };
            socket.emit('sendBlueData', p);
        });
        // canvas.addEventListener('click', drawBlueSine);
    });

    let purpleSelect = document.getElementById('purple-play-div');
    purpleSelect.addEventListener('click', () => {
        if (evl != null) {
            canvas.removeEventListener('click', evl);
        }
        evl = drawPurpleSine;
        canvas.addEventListener('click', (e) => {
    
            console.log(e);
            let p = {
                x: e.clientX,
                y: e.clientY
            };
            socket.emit('sendPurpleData', p);
        });
        //canvas.addEventListener('click', drawPurpleSine);
    });



    ///////////////////////SOCKET PORTION//////////////////
    //socket connection
    var socket = io.connect();

    socket.on('connect', function () {
        console.log("Connected");
    });

    //function to clear canvas
    function emitAndCanvas(data) {
        socket.emit('clear'); //send to server to clear
        clearCanvas(data);
        console.log('emitAndCanvas works!');
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log('clearCanvas works!');
    }

    //redo button clicked -> clear canvas
    document.body.onkeyup = function (event) {
        if (event.keyCode == 32) {
            console.log('redo button clicked!');
            emitAndCanvas();
        }
    }

    // this will handle the socket event and clears the canvas
    socket.on('clear', clearCanvas);


    // socket.on("position", function (data) {
    //     console.log(data);
    // });

    // //send to server data
    // socket.emit('drawLine', function (data) {
    //     console.log('message that drawLine emit is working');
    // });


    /////////////////// * ALL FUNCTIONS BELOW  *///////////////////

    /////////////////* PLOT SINE TEMPLATE *////////////
    //add in var amplitude, frequency, color so that it can make multiple color sine waves

    // plotSine(e.pageX, e.pageY, wavelength, 0, 0, amplitudeSine, rfreq, "#FD4F4F", lineWidth);

    // plotSine(e.pageX, e.pageY, wavelength, 0, 0, 40, rfreq, "#FD4F4F", 12);

    function plotSine(mouseX, mouseY, wavelength, xOffset, yOffset, amplitudeSine, frequency, color, lineWidth) {

        //let width = ctx.canvas.width;
        //let height = ctx.canvas.height;

        wavelength = canvas.width / 0.25;
        amplitudeSine = 40;
        lineWidth = 12;

        //set mouseX mouseY based on data json
        // mouseX = event.pageX;
        // mouseY = event.pageY;

        let x = mouseX - canvas.offsetLeft;
        let y = mouseY - canvas.offsetTop;
        console.log("x: "+ x);
        console.log("y: "+ y);

        //length = wavelength;
        //amplitudeSine = amplitudeSine;

        // console.log("x: " + x);
        // console.log("y: " + y);

        //draw line begins here
        ctx.save(); //push
        ctx.beginPath();
        //ctx.translate(canvas.width / 6, 0); //translate
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.lineWidth = lineWidth;

        //while x is a certain length, draw the sine wave
        while (x < wavelength) {
            z = y + amplitudeSine * Math.sin((x + xOffset) / frequency);
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


    /////////////* SOCKET FOR RECEIVING DATA */////////
    socket.on('sendRedData', function (data) {
        drawRedSine(data);
        console.log("Got: " + data);
    });

    socket.on('sendOrangeData', function (data) {
        drawOrangeSine(data);
        console.log("Got: " + data);
    });

    socket.on('sendYellowData', function (data) {
        drawYellowSine(data);
        console.log("Got: " + data);
    });

    socket.on('sendGreenData', function (data) {
        drawGreenSine(data);
        console.log("Got: " + data);
    });

    socket.on('sendCyanData', function (data) {
        drawCyanSine(data);
        console.log("Got: " + data);
    });

    socket.on('sendBlueData', function (data) {
        drawBlueSine(data);
        console.log("Got: " + data);
    });

    socket.on('sendPurpleData', function (data) {
        drawPurpleSine(data);
        console.log("Got: " + data);
    });



    ////////////////* FUNCTION FOR DRAWING EACH COLOR SINE *///////////
    // function plotSine(mouseX, mouseY, length, xOffset, yOffset, amplitudeSine, frequency, color, lineWidth)

    //only red change
    function drawRedSine(data) {
        console.log('e.pageX: '+ data.x);
        console.log('e.pageY: '+ data.y);
        plotSine(data.x, data.y, wavelength, 0, 0, amplitudeSine, rfreq, "#FD4F4F", lineWidth);
        playRedFreq(); //play red sound         
    }

    function drawOrangeSine(data) {
        console.log('e.pageX: '+ data.x);
        console.log('e.pageY: '+ data.y);
        plotSine(data.x, data.y, wavelength, 0, 0, amplitudeSine, ofreq, "#FF9D41", lineWidth);
        playOrangeFreq(); //play red sound         
    }

    function drawYellowSine(data) {
        console.log('e.pageX: '+ data.x);
        console.log('e.pageY: '+ data.y);
        plotSine(data.x, data.y, wavelength, 0, 0, amplitudeSine, yfreq, "#FBE11F", lineWidth);
        playYellowFreq(); //play yellow sound         
    }

    function drawGreenSine(data) {
        console.log('e.pageX: '+ data.x);
        console.log('e.pageY: '+ data.y);
        plotSine(data.x, data.y, wavelength, 0, 0, amplitudeSine, gfreq, "#B6E836", lineWidth);
        playGreenFreq(); //play yellow sound         
    }

    function drawCyanSine(data) {
        console.log('e.pageX: '+ data.x);
        console.log('e.pageY: '+ data.y);
        plotSine(data.x, data.y, wavelength, 0, 0, amplitudeSine, cfreq, "#1EDFBE", lineWidth);
        playCyanFreq(); //play yellow sound         
    }

    function drawBlueSine(data) {
        console.log('e.pageX: '+ data.x);
        console.log('e.pageY: '+ data.y);
        plotSine(data.x, data.y, wavelength, 0, 0, amplitudeSine, bfreq, "#29ACFF", lineWidth);
        playBlueFreq(); //play yellow sound         
    }

    function drawPurpleSine(data) {
        console.log('e.pageX: '+ data.x);
        console.log('e.pageY: '+ data.y);
        plotSine(data.x, data.y, wavelength, 0, 0, amplitudeSine, pfreq, "#685CFF", lineWidth);
        playPurpleFreq(); //play yellow sound         
    }



    // function drawOrangeSine(e) {
    //     plotSine(e.pageX, e.pageY, wavelength, 0, 0, amplitudeSine, ofreq, "#FF9D41", lineWidth);
    //     playOrangeFreq(); //play orange sound   
    // }

    // function drawYellowSine(e) {
    //     plotSine(e.pageX, e.pageY, wavelength, 0, 0, amplitudeSine, yfreq, "#FBE11F", lineWidth); //function plotSine(length, xOffset, yOffset,amplitude, frequency, color)
    //     playYellowFreq(); //play yellow sound  
    // }

    // function drawGreenSine(e) {
    //     plotSine(e.pageX, e.pageY, wavelength, 0, 0, amplitudeSine, gfreq, "#B6E836", lineWidth); //function plotSine(length, xOffset, yOffset,amplitude, frequency, color)
    //     playGreenFreq(); //play green sound  
    // }

    // function drawCyanSine(e) {
    //     plotSine(e.pageX, e.pageY, wavelength, 0, 0, amplitudeSine, cfreq, "#1EDFBE", lineWidth);//function plotSine(length, xOffset, yOffset,amplitude, frequency, color)
    //     playCyanFreq(); //play cyan sound  
    // }

    // function drawBlueSine(e) {
    //     plotSine(e.pageX, e.pageY, wavelength, 0, 0, amplitudeSine, bfreq, "#29ACFF", lineWidth);//function plotSine(length, xOffset, yOffset,amplitude, frequency, color)
    //     playBlueFreq(); //play blue sound  
    // }

    // function drawPurpleSine(e) {
    //     plotSine(e.pageX, e.pageY, wavelength, 0, 0, amplitudeSine, pfreq, "#685CFF", lineWidth); //function plotSine(length, xOffset, yOffset,amplitude, frequency, color)
    //     playPurpleFreq(); //play purple sound  
    // }



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
