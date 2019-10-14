///////////////////* CANVAS SECTION *///////////////////
// let canvas = document.getElementById('draw-canvas');
// var context = canvas.getContext('2d');



//default color if none seleted
let currentColor = '#000'; //default color

//////// * EXAMPLE CODE FOR DRWING CIRCLE */////
function drawCircle(event) {

    let canvas = document.getElementById("draw-canvas");
    let ctx = canvas.getContext("2d");
    let rect = canvas.getBoundingClientRect();
    //get x and y coord when user clicks on canvas
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    console.log("x: " + x);
    console.log("y: " + y);

    //draw the circle
    ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
}

//////////////////* FUNCTION DRAW WITH LOOP *///////////////
function init() {
    // canvas.onclick = drawBall;
    var canvas = document.getElementById("draw-canvas");
    var ctx = canvas.getContext("2d");

    //resize canvas to be window width + height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //canvas background color
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    */

    //draw sine on click test
    canvas.addEventListener('click', ()=>{
        window.requestAnimationFrame(drawPurple);
    });

    ///////////////////* SINE SECTION *////////////////////
    let xLoc = event.pageX - canvas.offsetLeft;
    let yLoc = event.pageY - canvas.offsetTop;

    //add in var amplitude, frequency, color so that it can make multiple color sine waves
    function plotSine(ctx, xOffset, yOffset, amplitude, frequency, color) {
        let width = ctx.canvas.width /2;
        let height = ctx.canvas.height / 2;

        //draw line begins here
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = color;

        //console.log("yOffset: " + yOffset);
        // var x = event.pageX - canvas.offsetLeft;
        // var y = event.pageY - canvas.offsetTop;

        var x = 0;
        var y = 0;
        var amplitude = amplitude;
        var frequency = frequency;

        //while x is a certain length, draw the sine wave
        while (x < 100) {
            y = height / 2 + amplitude * Math.sin((x + xOffset) / frequency);
            ctx.lineTo(x, y);
            x++;
            // console.log("x="+x+" y="+y);
        }

        ctx.save(); //push
        //console.log("Drawing point at y=" + y);
        ctx.fillStyle = 'rgba(255,0,0,0.5)';

        ctx.stroke();
        ctx.restore(); //pop
    }

    function drawPurple() {
        // let canvas = document.getElementById("canvas-purple");
        // let context = canvas.getContext("2d");
        ctx.clearRect(0, 0, 200, 200);

        //plot sine for purple
        ctx.save(); //push
        ctx.translate(canvas.width/3, -10); //translate 
        ctx.rotate(Math.PI / 3); // rotate 90 degrees clockwise

        plotSine(ctx, step, 2, 25, 5, "rgb(148, 3, 252)"); //function plotSine(ctx, xOffset, yOffset,amplitude, frequency, color)

        ctx.restore(); //pop
        step += 0.1; //changes the speed, like frame rate
        window.requestAnimationFrame(drawPurple);
    }




    //loops
    //window.requestAnimationFrame(animationLooper);
}
var step = -1;

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