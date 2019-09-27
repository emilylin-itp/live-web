// Steps from Code and Coffee

//client side needs:
//1. resize the canvas to users screen
//2. connect to the server and raw lines for the "drawLine" messages
//3. on click the client should send a "drawLine" message to the server when we are moving the mouse.

(function () {

  let socket = io();
  // var canvas = document.getElementById('canvas');
  // var colors = document.getElementsByClassName('color');
  // var context = canvas.getContext('2d');

  //set up my var
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let redoButton = document.getElementById('redo');
  let colors = document.getElementsByClassName('color');


  let current = {
    color: 'black'
  };
  let drawing = false;

  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

  //Touch support for mobile devices
  canvas.addEventListener('touchstart', onMouseDown, false);
  canvas.addEventListener('touchend', onMouseUp, false);
  canvas.addEventListener('touchcancel', onMouseUp, false);
  canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

  for (var i = 0; i < colors.length; i++) {
    colors[i].addEventListener('click', onColorUpdate, false);
  }

  socket.on('drawing', onDrawingEvent);

  window.addEventListener('resize', onResize, false);
  onResize();


  function drawLine(x0, y0, x1, y1, color, emit) {
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) { return; }
    var w = canvas.width;
    var h = canvas.height;

    socket.emit('drawing', {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    });
  }

  function onMouseDown(e) {
    drawing = true;
    current.x = e.clientX || e.touches[0].clientX;
    current.y = e.clientY || e.touches[0].clientY;
  }

  function onMouseUp(e) {
    if (!drawing) { return; }
    drawing = false;
    drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
  }

  function onMouseMove(e) {
    if (!drawing) { return; }
    drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
    current.x = e.clientX || e.touches[0].clientX;
    current.y = e.clientY || e.touches[0].clientY;
  }

  function onColorUpdate(e) {
    current.color = e.target.className.split(' ')[1];
  }

  // limit the number of events per second
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function () {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  function onDrawingEvent(data) {
    var w = canvas.width;
    var h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  }

  // make the canvas fill its parent
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

})();


/*
function drawLine(context, x1, y1, x2, y2, color) {
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.lineWidth = 7;
  context.lineCap = 'round';
  context.stroke();
  context.strokeStyle = color;
}

document.addEventListener("DOMContentLoaded", function () {
  //set up my var
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let redoButton = document.getElementById('redo');
  let colors = document.getElementsByClassName('color');

  let current = {
    color: 'darkgreen';
  };

  //dom for colors
  let darkGreen = document.getElementById('darkgreen');

  //for canvas
  canvas.width = width;
  canvas.height = height;

  //for drawing
  let drawing = false;
  let x, y, prevX, prevY;
  let colorSelect;

  //function to clear canvas
  function emitAndCanvas() {
    socket.emit('clear');
    console.log('emitAndCanvas works!');
  }

  //function to clear canvas
  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log('clearCanvas works!');
  }

  //redo button clicked -> clear canvas
  // redoButton.addEventListener('click', () => {
  //   console.log('redo button clicked!');
  //   emitAndCanvas();
  //   clearCanvas();
  // });

  var socket = io.connect();

  canvas.onmousedown = function (e) {
    drawing = true;
    prevX = x;
    prevY = y;
    color = colorSelect;
  }

  canvas.onmouseup = function (e) {
    drawing = false;
  }

  canvas.onmousemove = function (e) {
    x = e.clientX;
    y = e.clientY;
    if (drawing) {
      socket.emit('draw', {
        'x1': prevX,
        'y1': prevY,
        'x2': x,
        'y2': y,
        'color': colorSelect;
      });

      drawLine(context, prevX, prevY, x, y, colorSelect);
      prevX = x;
      prevY = y;

      //redo button clicked -> clear canvas
      redoButton.addEventListener('click', () => {
        console.log('redo button clicked!');
        emitAndCanvas();
        clearCanvas();
      });

    }
  }

  socket.on('draw', function (data) {
    drawLine(context, data.x1, data.y1, data.x2, data.y2);
  });
});

*/
