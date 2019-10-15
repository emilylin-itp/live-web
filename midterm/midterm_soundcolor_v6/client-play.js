

//////////////////MAIN FUNCTION//////////////////////
function init() {
    // canvas
    var canvas = document.getElementById("draw-canvas");
    var ctx = canvas.getContext("2d");
    //let rect = canvas.getBoundingClientRect();

    //resize canvas to be window width + height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    //////////// CLICK EVENT TO DRAW SINE WAVES ///////////////
    //canvas.addEventListener('click', drawRedSine);

    // canvas background color
    ctx.fillStyle = "rgba(255, 255, 255, 0)"; //placeholder pink

    //canvas size 
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    /*///SAMPLE CODE FOR ACCESSING VAR IN FUNCTION////
    function a() {
        var sample = "hello world";
        return sample;
    }
    
    var sample2 = a();
    console.log(sample2); //This prints hello world
    */

    //set local and global current color variable
    let currentColor;
    //let globalColor;

    let redSelect = document.getElementById('red-play-div');
    redSelect.addEventListener('click', () => {
        colorToDraw('red');
        console.log(currentColor);
        canvas.addEventListener('click', drawRedSine);
    });

    let orangeSelect = document.getElementById('orange-play-div');
    orangeSelect.addEventListener('click', () => {
        colorToDraw('orange');
        console.log(currentColor);
        canvas.addEventListener('click', drawOrangeSine);
    });

    let yellowSelect = document.getElementById('yellow-play-div');
    yellowSelect.addEventListener('click', () => {
        colorToDraw('yellow');
        console.log(currentColor);
        canvas.addEventListener('click', drawYellowSine);
    });

    let greenSelect = document.getElementById('green-play-div');
    greenSelect.addEventListener('click', () => {
        colorToDraw('green');
        console.log(currentColor);
        canvas.addEventListener('click', drawGreenSine);
    });

    let cyanSelect = document.getElementById('cyan-play-div');
    cyanSelect.addEventListener('click', () => {
        colorToDraw('cyan');
        console.log(currentColor);
        canvas.addEventListener('click', drawCyanSine);
    });

    let blueSelect = document.getElementById('blue-play-div');
    blueSelect.addEventListener('click', () => {
        colorToDraw('blue');
        console.log(currentColor);
        canvas.addEventListener('click', drawBlueSine);
    });

    let purpleSelect = document.getElementById('purple-play-div');
    purpleSelect.addEventListener('click', () => {
        colorToDraw('purple');
        console.log(currentColor);
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


    ///TRYING TO ACCESS THE VAR CURRENT COLOR IN FUNCTION COLOR TO DRAW 
    // SO THAT I CAN USE IT AS A GLOBAL VARIABLE. THEN DRAW SINE BASED ON NEW GLOBAL VARIABLE!

    // colorToDraw = changeColor();
    //console.log(currentColor);


    /*
        /////////////// ORANGE ///////////////
        let orangeSelect = document.getElementById('orange-palette');
        orangeSelect.addEventListener('click', () => {
            currentColor = 'orange';
        });
    
        //check to see if current color is orange ('#FF9D41'), if orange then draw that sine wave
        if (currentColor === 'orange') {
            canvas.addEventListener('click', drawOrangeSine);
        }
    
    
        /////////////// YELLOW ///////////////
        let yellowSelect = document.getElementById('yellow-palette');
        yellowSelect.addEventListener('click', () => {
            // window.requestAnimationFrame(drawYellowSine);
            console.log('yellow');
        });
    
        let greenSelect = document.getElementById('green-palette');
        greenSelect.addEventListener('click', () => {
            // window.requestAnimationFrame(drawGreenSine);
            console.log('green');
        });
    
        let cyanSelect = document.getElementById('cyan-palette');
        cyanSelect.addEventListener('click', () => {
            // window.requestAnimationFrame(drawCyanSine);
            console.log('cyan');
        });
    
        let blueSelect = document.getElementById('blue-palette');
        blueSelect.addEventListener('click', () => {
            // window.requestAnimationFrame(drawBlueSine);
            console.log('blue');
        });
    
        let purpleSelect = document.getElementById('purple-palette');
        purpleSelect.addEventListener('click', () => {
            // window.requestAnimationFrame(drawPurpleSine);
            console.log('purple');
        });
        * /
    
    
        /////////////////* PLOT SINE TEMPLATE *////////////
    //add in var amplitude, frequency, color so that it can make multiple color sine waves
    function plotSine(event, length, xOffset, yOffset, amplitude, frequency, color) {
        let width = ctx.canvas.width;
        let height = ctx.canvas.height;

        //mousex mousey
        let x = event.pageX - canvas.offsetLeft;
        let y = event.pageY - canvas.offsetTop;

        // console.log("x: " + x);
        // console.log("y: " + y);

        //draw line begins here
        ctx.save(); //push
        ctx.beginPath();
        //ctx.translate(canvas.width / 6, 0); //translate
        ctx.lineWidth = 10;
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';

        // var x = 0;
        // var y = 0;
        var amplitude = amplitude;
        var frequency = frequency;

        //while x is a certain length, draw the sine wave
        while (x < length) {
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

    let wavelength = canvas.width/0.25;
    let amplitudeSine = 40;

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



    ////////////////* FUNCTION FOR DRAWING EACH COLOR SINE *///////////
    function drawRedSine(event) {
        plotSine(event, wavelength, 0, 0, amplitudeSine, rfreq, "#FD4F4F");
        //function plotSine(length, xOffset, yOffset,amplitude, frequency, color) 
    }

    function drawOrangeSine(event) {
        plotSine(event, wavelength, 0, 0, amplitudeSine, ofreq, "#FF9D41");
        //function plotSine(length, xOffset, yOffset,amplitude, frequency, color) 
    }

    function drawYellowSine(event) {
        plotSine(event, wavelength, 0, 0, amplitudeSine, yfreq, "#FBE11F");
        //function plotSine(length, xOffset, yOffset,amplitude, frequency, color)
    }

    function drawGreenSine(event) {
        plotSine(event, wavelength, 0, 0, amplitudeSine, gfreq, "#B6E836");
        //function plotSine(length, xOffset, yOffset,amplitude, frequency, color)
    }

    function drawCyanSine(event) {
        plotSine(event, wavelength, 0, 0, amplitudeSine, cfreq, "#1EDFBE");
        //function plotSine(length, xOffset, yOffset,amplitude, frequency, color)
    }

    function drawBlueSine(event) {
        plotSine(event, wavelength, 0, 0, amplitudeSine, bfreq, "#29ACFF");
        //function plotSine(length, xOffset, yOffset,amplitude, frequency, color)
    }

    function drawPurpleSine(event) {
        plotSine(event, wavelength, 0, 0, amplitudeSine, pfreq, "#685CFF");
        //function plotSine(length, xOffset, yOffset,amplitude, frequency, color)
    }

}


//////////////////* LOAD *///////////////
window.addEventListener('load', init);




///////* USE FOR LATER - THE CLICK PALETTE TO GET COLOR *///////

    // //get color selected
    // let redDiv = document.getElementById('red-div');
    // let orangeDiv = document.getElementById('orange-div');
    // let yellowDiv = document.getElementById('yellow-div');
    // let greenDiv = document.getElementById('green-div');
    // let cyanDiv = document.getElementById('cyan-div');
    // let blueDiv = document.getElementById('blue-div');
    // let purpleDiv = document.getElementById('purple-div');


    // redDiv.addEventListener('click', () => {
    //     console.log('red selected');
    //     currentColor = '#FD4F4F';
    // });

    // orangeDiv.addEventListener('click', () => {
    //     console.log('orange selected');
    //     currentColor = '#FF9D41';
    // });

    // yellowDiv.addEventListener('click', () => {
    //     console.log('yellow selected');
    //     currentColor = '#FBE11F';
    // });

    // greenDiv.addEventListener('click', () => {
    //     console.log('green selected');
    //     currentColor = '#B6E836';
    // });

    // cyanDiv.addEventListener('click', () => {
    //     console.log('cyan selected');
    //     currentColor = '#1EDFBE';
    // });

    // blueDiv.addEventListener('click', () => {
    //     console.log('blue selected');
    //     currentColor = '#29ACFF';
    // });

    // purpleDiv.addEventListener('click', () => {
    //     console.log('purple selected');
    //     currentColor = '#685CFF';
    // });


///////* DUMPSTER *///////
/*
//draw ball ex
//draw ball is just an ex before adding the sine waves!
function drawBall(event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;

    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * 3.14);
    ctx.fill();
}

//draw ball ex
canvas.addEventListener('click', drawBall);

    function drawPurple() {
        // let canvas = document.getElementById("canvas-purple");
        // let context = canvas.getContext("2d");

        // ctx.clearRect(0, 0, 200, 200);

        // //plot sine for purple
        // ctx.save(); //push
        // ctx.translate(canvas.width / 2, 10); //translate
        // ctx.rotate(Math.PI / 2); // rotate 90 degrees clockwise
        // ctx.clearRect(0, 0, 500, 500);

        plotSine(100, 0, 2, 15, 5, "#685CFF"); //function plotSine(length, xOffset, yOffset,amplitude, frequency, color)
        // backgroundClear();
        // ctx.restore(); //pop
        //step += 0.1; //changes the speed, like frame rate
        window.requestAnimationFrame(drawPurple);
    }
    //loops
    //window.requestAnimationFrame(animationLooper);

    function drawYellow() {
        // let canvas = document.getElementById("canvas-purple");
        // let context = canvas.getContext("2d");
        ctx.save(); //push
        // ctx.clearRect(0, 0, 500, 500);
        // //plot sine for purple

        // ctx.translate(canvas.width / 3, -10); //translate
        // ctx.rotate(Math.PI / 3); // rotate 90 degrees clockwise

        plotSine(200, 0, 1, 5, 35, "#FBE11F"); //function plotSine(length, xOffset, yOffset,amplitude, frequency, color)

        ctx.restore(); //pop
        //step += -0.1; //changes the speed, like frame rate
        window.requestAnimationFrame(drawYellow);
    }



    /* DRAW BALL EXAMPLE
    function drawBall(event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;

        console.log("x: " + x);
        console.log("y: " + y);

        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * 3.14);
        ctx.fill();
    }

    // //draw ball ex
    // canvas.addEventListener('click', drawBall);
    */




    ///////////////////* SINE SECTION *////////////////////
    //mouse location (but not sure how to use it yet)
    // let xLoc = event.pageX - canvas.offsetLeft;
    // let yLoc = event.pageY - canvas.offsetTop;

/*
/* DRAW BALL EXAMPLE
function drawBall(event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;

    console.log("x: " + x);
    console.log("y: " + y);

    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * 3.14);
    ctx.fill();
}
*/