window.addEventListener('load', init);

///////////////////* TOGGLE BOTTOM BAR *//////////////////
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

///////////////////* PLOT SINE *//////////////////
function plotSine(ctx, xOffset, yOffset) {
    let width = ctx.canvas.width;
    let height = ctx.canvas.height;

    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = "rgba(66,44,255)";
    ctx.lineCap = 'round';

    let x = ctx.pageX;
    let y = ctx.pageY;

    console.log("x: "+ x);
    console.log("y: "+ y);

    let amplitude = 40;
    let frequency = 20;

    while (x < width){
        z = y + amplitude * Math.sin((x + xOffset) / frequency);
        ctx.lineTo(x, z);
        x++;
        fadeOutEffect();
        // console.log("x="+x+" y="+y);
    }
    // while (xPos < width) {
    //     y = height / 2 + amplitude * Math.sin((x + xOffset) / frequency);
    //     ctx.lineTo(x, y);
    //     xPos++;
    //     fadeOutEffect();
    //     // console.log("x="+x+" y="+y);
    // }
    ctx.stroke();
}

///////////////////* FADE OUT EFFECT *//////////////////
function fadeOutEffect() {
    var fadeTarget = document.getElementById("draw-canvas");
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.025;
        } else {
            clearInterval(fadeEffect);
        }
    }, 5000);
}

function draw() {
    var canvas = document.getElementById("draw-canvas");
    var context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);
    // console.log('canvas width: ' + canvas.width);
    // console.log('canvas height: ' + canvas.height);
    // showAxes(context);
    context.save();

    plotSine(context, step, 50);
    context.restore();

    step += 4; //changes the speed
    window.requestAnimationFrame(draw);
}
let step = -4;


function init() {
    window.requestAnimationFrame(draw);

     ///////////////////////CONNECT TO SOCKET//////////////////
    //socket connection
    // var socket = io.connect();

    // socket.on('connect', function () {
    //     console.log("Connected");
    // });

    // x mark in bottom container
    let bottomX = document.getElementById('bottom-div-x');
    bottomX.addEventListener('click', () => {
        toggleBottom();
        console.log('x clicked!');
    });

}
