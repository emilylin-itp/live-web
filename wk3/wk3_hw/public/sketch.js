var socket;


function setup(){
    createCanvas(500,500);
    background(255,255,0);

    socket = socket.io.connect('http://localhost:8000');
}

function draw(){
    fill(0);
    ellipse(mouseX, mouseY, 20);
}