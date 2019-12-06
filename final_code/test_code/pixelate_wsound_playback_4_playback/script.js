window.addEventListener('load', init)

function init() {
  // The video element on the page to display the webcam
  var video = document.getElementById('thevideo');
  // console.log(video);

  // Canvas element on the page
  var canvas = document.getElementById('thecanvas');
  var context = canvas.getContext('2d');

  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;
  console.log("canvasWidth: " + context.canvas.width);
  console.log("canvasHeight: " + context.canvas.height);


  ///////// VIDEO SECTION /////////
  // Constraints - what do we want?
  let constraints = {
    audio: false,
    video: true
  };

  // Prompt the user for permission, get the stream
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    /* Use the stream */

    // Attach to our video object
    video.srcObject = stream;

    // Wait for the stream to load enough to play
    video.onloadedmetadata = function (e) {
      video.play();
      draw();
    };
  })
    .catch(function (err) {
      /* Handle the error */
      alert(err);
    });

  /////////////////// DRAW LOOP /////////////////////
  // function mainLoop() {
  //   //draw canvas
  //   context.save(); //push
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //   requestAnimationFrame(mainLoop);
  // }
  // requestAnimationFrame(mainLoop);


  ///////////////// FAKE PICK //////////////////////
  /////(SHAWN WROTE THE FAKE X + Y SECTION) ////////

  // // play button
  var playButton = document.getElementById('play-button');
  playButton.addEventListener('click', ()=>{
    moveFakePick();
    //playPixelsLoop();
  });



  //playButton.addEventListener('click', moveFakePick);

  let fakeX = 0;
  let fakeY = 0;
  let binSize = canvas.width / 12;
  let originFakeX = canvas.width / 20;
  let originFakeY = canvas.height / 20;


  function moveFakePick() {
    setInterval(function () {
      fakeX = fakeX + binSize;
      fakeY;

      //if fake x is at edge of canvas move fake y down one row
      // then move fake y across the opposite way
      if (fakeX >= canvas.width) {
        fakeY = fakeY + binSize;
        fakeX = originFakeX;
      }

      //if fake Y is at canvas bottom, move to origin
      if (fakeY >= canvas.height) {
        fakeY = originFakeY;
        fakeX = fakeX + binSize;
      }

      // console.log('originFakeX: ' + originFakeX);
      // console.log('binSize: ' + binSize);
      // console.log('fakeX: ' + fakeX);

      // drawRect(fakeX, fakeY, binSize); //moved drawRect function to loop section
      //function to change which pixel is picked
      fakePick(fakeX, fakeY);

      // var fakePosition = { "x": fakeX, "y": fakeY };
      // return fakePosition;
      //drawRect(fakeX, fakeY, binSize); //moved drawRect function to loop section
    }, 100); // every 1 sec move the x position by 100
  }


  // console.log("fakeX, fakeY :" + fakeX + ','+ fakeY);



  ///// FAKE PICK //////
  function fakePick(x, y) {
    if (!currentlyPicking) {
      currentlyPicking = true;
      //get color info
      let color = document.getElementById("thecolor");
      let colorText = document.getElementById("colortext");
      let hslText = document.getElementById("hsltext");
      let frequencyText = document.getElementById("frequencytext");

      // let x = fakeX; //mouse x pos
      // let y = fakeY; //mouse y pos
      // console.log('fakeX: ' + fakeX);

      let pixel = context.getImageData(x, y, 1, 1); //x y pos of ever 1 x 1 pixel 
      let data = pixel.data;
      let rgb = 'rgb(' + data[0] + ', ' + data[1] + ', ' + data[2] + ')';

      let r = data[0];
      let g = data[1];
      let b = data[2];

      console.log("r: " + r + " g: " + g + " b: " + b);

      //find hsl from rgb
      RGBToHSL(r, g, b);

      //change dom elements
      color.style.background = rgb;
      colorText.innerHTML = rgb;
      hslText.innerHTML = RGBToHSL(r, g, b);

      // console.log("wavelength text: " + hslText.innerHTML);
      setTimeout(function () { currentlyPicking = false; }, 100);
    }
  }

  ///////// DRAW SHAPE ////////
  function drawRect(x, y) {
    // let newX = -binSize; //half of the bin
    // let moveX = x;

    // animateX = newX + moveX; //move right

    context.fillRect(x, y, 10, 10);
    // context.rect(animateX, y, 10, 10);
    //console.log('animate rect x:' + animateX);
  }


  ///////// OG PICK FUNCTION: MOVES THROUGH CANVAS /////////
  var currentlyPicking = false;

  ///////* DRAW FUNCTION *//////
  function draw() {


    console.log("It should be drawing!");

    // // Draw the video onto the canvas
    // context.drawImage(video, 0, 0, video.width, video.height);

    var dataUrl = thecanvas.toDataURL();
    //console.log(dataUrl);

    let options = {
      pixelWidth: 500,
      pixelHeight: 500
    };

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    Pixelate(imageData, imageData, options);
    context.putImageData(imageData, 0, 0);

    //setup the animation loop. starts when the video begins to play
    video.onplay = function (e) {
      setTimeout(function () {
        setInterval(updateCanvas, 30);
        let video = document.getElementById('thevideo');
        let canvas = document.getElementById('thecanvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }, 1000);
    };

  };

  /////////* UPDATE CANVAS AND PIXEL EFFECT *////////////
  //update canvas + pixel effect called here
  function updateCanvas() {
    let video = document.getElementById('thevideo');
    let canvas = document.getElementById('thecanvas');
    let ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0);

    //this is where you change pixel size
    let options = {
      pixelWidth: 8,
      pixelHeight: 8
    };

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    Pixelate(imageData, imageData, options);
    ctx.putImageData(imageData, 0, 0);


    // //Draw Rect to go through 
    // drawRect(fakeX, fakeY);

    // ///////////// FAKE MOUSE MOVE THROUGH PIXELS ////////////
    //   fakeX = fakeX + binSize;
    //   fakeY;

    //   //if fake x is at edge of canvas move fake y down one row
    //   // then move fake y across the opposite way
    //   if (fakeX >= canvas.width) {
    //     fakeY = fakeY + binSize;
    //     fakeX = originFakeX;
    //   }

    //   //if fake Y is at canvas bottom, move to origin
    //   if (fakeY >= canvas.height) {
    //     fakeY = originFakeY;
    //     fakeX = fakeX + binSize;
    //   }

    //   console.log('originFakeX: ' + originFakeX);
    //   console.log('binSize: ' + binSize);
    //   console.log('fakeX: ' + fakeX);

    drawRect(fakeX, fakeY, binSize); //moved drawRect function to loop section
    //   //function to change which pixel is picked
    //   fakePick(fakeX, fakeY);
    //   // drawRect(fakeX, fakeY, binSize); //moved drawRect function to loop sectio


    //setup the animation loop. starts when the video begins to play
    video.onplay = function (e) {
      setTimeout(function () {
        setInterval(updateCanvas, 30);
        let video = document.getElementById('thevideo');
        let canvas = document.getElementById('thecanvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }, 1000);
    };
  }

  // var requestId;

  // function loop(5000) {
  //   requestId = undefined;

  //   ...
  //   // do stuff
  //   ...

  //   start();
  // }

  // function start() {
  //   if (!requestId) {
  //     requestId = window.requestAnimationFrame(loop);
  //   }
  // }

  // function stop() {
  //   if (requestId) {
  //     window.cancelAnimationFrame(requestId);
  //     requestId = undefined;
  //   }
  // }


  var fps = 20;

  // function playPixelsLoop() {
  //   setTimeout(function () {
  //     requestAnimationFrame(playPixelsLoop);

  //     // ... Code for Drawing the Frame ...
  //     ///////////// FAKE MOUSE MOVE THROUGH PIXELS ////////////
  //     fakeX = fakeX + binSize;
  //     fakeY;

  //     //if fake x is at edge of canvas move fake y down one row
  //     // then move fake y across the opposite way
  //     if (fakeX >= canvas.width) {
  //       fakeY = fakeY + binSize;
  //       fakeX = originFakeX;
  //     }

  //     //if fake Y is at canvas bottom, move to origin
  //     if (fakeY >= canvas.height) {
  //       fakeY = originFakeY;
  //       fakeX = fakeX + binSize;
  //     }

  //     console.log('originFakeX: ' + originFakeX);
  //     console.log('binSize: ' + binSize);
  //     console.log('fakeX: ' + fakeX);

  //     drawRect(fakeX, fakeY, binSize); //moved drawRect function to loop section
  //     //function to change which pixel is picked
  //     fakePick(fakeX, fakeY);
  //     // requestAnimationFrame(playPixelsLoop);

  //   }, 1000 / fps);
  // }

  // playPixelsLoop();


  function playPixelsLoop() {
    ///////////// FAKE MOUSE MOVE THROUGH PIXELS ////////////
    fakeX = fakeX + binSize;
    fakeY;

    //if fake x is at edge of canvas move fake y down one row
    // then move fake y across the opposite way
    if (fakeX >= canvas.width) {
      fakeY = fakeY + binSize;
      fakeX = originFakeX;
    }

    //if fake Y is at canvas bottom, move to origin
    if (fakeY >= canvas.height) {
      fakeY = originFakeY;
      fakeX = fakeX + binSize;
    }

    console.log('originFakeX: ' + originFakeX);
    console.log('binSize: ' + binSize);
    console.log('fakeX: ' + fakeX);

    drawRect(fakeX, fakeY, binSize); //moved drawRect function to loop section
    //function to change which pixel is picked
    fakePick(fakeX, fakeY);
    // drawRect(fakeX, fakeY, binSize); //moved drawRect function to loop section
    requestAnimationFrame(playPixelsLoop);
  }
  // requestAnimationFrame(playPixelsLoop);


  ////* PIXELATE VID *//////
  // Source: http://blog.acipo.com/js-canvas-pixelate/
  function Pixelate(src, dst, opt) {

    var xBinSize = opt.pixelWidth * 10,
      yBinSize = opt.pixelHeight * 10;

    var xSize = src.width,
      ySize = src.height,
      srcPixels = src.data, //what is src.data capturing?
      dstPixels = dst.data,
      x, y, i;

    var pixelsPerBin = xBinSize * yBinSize,
      red, green, blue, alpha,
      nBinsX = Math.ceil(xSize / xBinSize),
      nBinsY = Math.ceil(ySize / yBinSize),
      xBinStart, xBinEnd, yBinStart, yBinEnd,
      xBin, yBin, pixelsInBin;

    for (xBin = 0; xBin < nBinsX; xBin += 1) {
      for (yBin = 0; yBin < nBinsY; yBin += 1) {

        // Initialize the color accumlators to 0
        red = 0;
        green = 0;
        blue = 0;
        alpha = 0;

        // Determine which pixels are included in this bin
        xBinStart = xBin * xBinSize;
        xBinEnd = xBinStart + xBinSize; //for xBin=0 it is 10
        yBinStart = yBin * yBinSize;
        yBinEnd = yBinStart + yBinSize;


        // Add all of the pixels to this bin!
        pixelsInBin = 0;
        for (x = xBinStart; x < xBinEnd; x += 1) {
          if (x >= xSize) { continue; }
          for (y = yBinStart; y < yBinEnd; y += 1) {
            if (y >= ySize) { continue; }
            i = (xSize * y + x) * 4; //how is i defined? why x4?
            red += srcPixels[i + 0];
            green += srcPixels[i + 1];
            blue += srcPixels[i + 2];
            alpha += srcPixels[i + 3];
            pixelsInBin += 1;
          }
        }

        // Make sure the channels are between 0-255
        red = red / pixelsInBin;
        green = green / pixelsInBin;
        blue = blue / pixelsInBin;
        alphas = alpha / pixelsInBin;

        // Draw this bin
        for (x = xBinStart; x < xBinEnd; x += 1) {
          if (x >= xSize) { continue; }
          for (y = yBinStart; y < yBinEnd; y += 1) {
            if (y >= ySize) { continue; }
            i = (xSize * y + x) * 4;
            dstPixels[i + 0] = red;
            dstPixels[i + 1] = green;
            dstPixels[i + 2] = blue;
            dstPixels[i + 3] = alpha;
          }
        }
      }
    }
    //console.log('xBinStart: ' + xBinStart);
  };

  ///////* CONVERT RGB TO HSL *//////
  /* source: https://css-tricks.com/converting-color-spaces-in-javascript/*/
  function RGBToHSL(r, g, b) {
    //make r, g, b fractions of 1
    r = r / 255;
    g = g / 255;
    b = b / 255;

    //find greatest and smallest channel value
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    // calculate hue
    // if no difference
    if (delta == 0)
      h = 0;
    //red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    //green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    //blue is max
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    //make neg hues positive behind 360
    if (h < 0)
      h += 360;

    //calculate lightness
    l = (cmax + cmin) / 2;

    //calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    //multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    //console.log('h: ' + h);

    //convert hue to wavelength
    //https://stackoverflow.com/questions/11850105/hue-to-wavelength-mapping
    // Estimating that the usable part of the visible spectrum is 450-620nm, 
    // with wavelength (in nm) and hue value (in degrees):
    let wavelength = Math.ceil(620 - 170 / 270 * h);
    //console.log('wavelength: ' + wavelength);

    //convert wavelength (nm) to frequency (THz)
    findFrequency(wavelength);

    return ("hsl(" + h + "," + s + "%," + l + "%)" + "; " + "wavelength: " + wavelength + ";  " + "frequency: " + findFrequency(wavelength));

    // return(wavelength);
  }
};

/////* FIND FREQUENCY */////
// wl = wavelength
function findFrequency(wl) {
  let frequency;
  frequency = Math.ceil(3 * (Math.pow(10, 5)) / wl);

  playFreq(frequency);
  return frequency;
}

/////////////////// FUNCTIONS TO MAP FREQ //////////////////
//map for color wavelengths
// linearly maps value from the range (a..b) to (c..d)
function mapRange(colorFrequency, low1, high1, low2, high2) {
  let freqDrawValue = low2 + (high2 - low2) * (colorFrequency - low1) / (high1 - low1);
  // console.log("freqDrawValue: " + freqDrawValue);
  return freqDrawValue;
}

/////////* PLAY PITCH  *////////
//set up color + pitch frequency
let lowColFreq = 400;
let highColFreq = 789;
let lowPitchFreq = 20;
let highPitchFreq = 3000;

///// * PLAY COLOR FREQ */////////
function playFreq(frequency) {
  let freqPitch = Math.floor(mapRange(frequency, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
  //console.log("freq pitch: " + freqPitch);
  startOsc(freqPitch);
}


//////////* SOUND MUST HAVES */////////////
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

  console.log("sound frequency: " + frequency);

  oscillator.start(audioCtx.currentTime);

  // Create GainNode	
  gain = audioCtx.createGain(); // Create gain node
  gain.gain.value = 2; // Set gain to half volume

  // Connect the Nodes
  oscillator.connect(gain); // Connect oscillator to gain
  gain.connect(audioCtx.destination); // Connect gain to output

  oscillator.stop(audioCtx.currentTime + 0.1);
}



///////**////// MOUSE MOVE FUNCTION///////////
  ///////* PICK COLOR FROM CANVAS *//////
  // function pick(e) {
  //   if (!currentlyPicking) {
  //     currentlyPicking = true;
  //     //get color info
  //     let color = document.getElementById("thecolor");
  //     let colorText = document.getElementById("colortext");
  //     let hslText = document.getElementById("hsltext");
  //     //let frequencyText = document.getElementById("frequencytext");

  //     let x = e.clientX; //mouse x pos
  //     let y = e.clientY; //mouse y pos

  //     console.log('mousex pos: ' + x);
  //     console.log('mousey pos: ' + y);

  //     let pixel = context.getImageData(x, y, 1, 1); //x y pos of ever 1 x 1 pixel 
  //     let data = pixel.data;

  //     console.log('data: ' + data);
  //     let rgb = 'rgb(' + data[0] + ', ' + data[1] + ', ' + data[2] + ')';

  //     let r = data[0];
  //     let g = data[1];
  //     let b = data[2];

  //     console.log("r: " + r + " g: " + g + " b: " + b);

  //     //find hsl from rgb
  //     RGBToHSL(r, g, b);

  //     //change dom elements
  //     color.style.background = rgb;
  //     colorText.innerHTML = rgb;
  //     hslText.innerHTML = RGBToHSL(r, g, b);

  //     // console.log("wavelength text: " + hslText.innerHTML);
  //     setTimeout(function () { currentlyPicking = false; }, 100);
  //   }
  // }

  // // show color with pick function
  // canvas.addEventListener('mousemove', pick);
