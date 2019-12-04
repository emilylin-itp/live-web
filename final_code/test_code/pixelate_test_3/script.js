window.addEventListener('load', function () {
  // The video element on the page to display the webcam
  var video = document.getElementById('thevideo');

  // Canvas element on the page
  var canvas = document.getElementById('thecanvas');
  console.log(thecanvas);

  var context = canvas.getContext('2d');
  console.log(context);
  console.log(video);

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


   ///////* PICK COLOR FROM CANVAS *//////
  function pick(e) {
    //get color info
    let color = document.getElementById("thecolor");
    let colorText = document.getElementById("colortext");
    let hslText = document.getElementById("hsltext");
    let frequencyText = document.getElementById("frequencytext");

    let x = e.layerX; //mouse x pos
    let y = e.layerY; //mouse y pos
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

    console.log("wavelength text: " + hslText.innerHTML);
  }

  // show color with pick function
  canvas.addEventListener('mousemove', pick);

  ///////* DRAW FUNCTION *//////
  var draw = function () {
    // Pixelate function:determine the size of each 'pixel' (ie how many real pixels will be in our larger pixel). Then we divide the canvas into the larger pixels. For each larger pixel we average the real pixels within it and draw the larger pixel as that average.

    // Code from here: http://blog.acipo.com/js-canvas-pixelate/
    let Pixelate = function (src, dst, opt) {

      var xBinSize = opt.pixelWidth,
        yBinSize = opt.pixelHeight;

      console.log("xBinSize: " + xBinSize); //400
      console.log("yBinSize: " + yBinSize); //400

      var xSize = src.width,
        ySize = src.height,
        srcPixels = src.data,
        dstPixels = dst.data,
        x, y, i;

      // console.log("srcPixels: " + srcPixels); 
      // console.log("dstPixels: " + dstPixels);
      console.log("xSize: " + xSize); //300
      console.log("ySize: " + ySize); //150

      let pixelsPerBin = xBinSize * yBinSize,
        red, green, blue, alpha,
        nBinsX = Math.ceil(xSize / xBinSize),
        nBinsY = Math.ceil(ySize / yBinSize),
        xBinStart, xBinEnd, yBinStart, yBinEnd,
        xBin, yBin, pixelsInBin;

      console.log("nBinsX: " + nBinsX); //1
      console.log("nBinsY: " + nBinsY); //1

      for (xBin = 0; xBin < nBinsX; xBin += 1) {
        for (yBin = 0; yBin < nBinsY; yBin += 1) {

          // Initialize the color accumlators to 0
          red = 0;
          green = 0;
          blue = 0;
          alpha = 0;

          // Determine which pixels are included in this bin
          xBinStart = xBin * xBinSize;
          xBinEnd = xBinStart + xBinSize;
          yBinStart = yBin * yBinSize;
          yBinEnd = yBinStart + yBinSize;

          // Add all of the pixels to this bin!
          pixelsInBin = 0;
          for (x = xBinStart; x < xBinEnd; x += 1) {
            if (x >= xSize) { continue; }
            for (y = yBinStart; y < yBinEnd; y += 1) {
              if (y >= ySize) { continue; }
              i = (xSize * y + x) * 4;
              red += srcPixels[i + 0];
              green += srcPixels[i + 1];
              blue += srcPixels[i + 2];
              alpha += srcPixels[i + 3];
              pixelsInBin += 4;
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
    };

    console.log("It should be drawing!");
    // // Draw the video onto the canvas
    // context.drawImage(video, 0, 0, video.width, video.height);

    var dataUrl = thecanvas.toDataURL();
    console.log(dataUrl);

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

  ////* PIXELATE VID *//////
  // Source: http://blog.acipo.com/js-canvas-pixelate/
  var Pixelate = function (src, dst, opt) {

    var xBinSize = opt.pixelWidth * 10,
      yBinSize = opt.pixelHeight * 10;

    var xSize = src.width,
      ySize = src.height,
      srcPixels = src.data,
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
        xBinEnd = xBinStart + xBinSize;
        yBinStart = yBin * yBinSize;
        yBinEnd = yBinStart + yBinSize;

        // Add all of the pixels to this bin!
        pixelsInBin = 0;
        for (x = xBinStart; x < xBinEnd; x += 1) {
          if (x >= xSize) { continue; }
          for (y = yBinStart; y < yBinEnd; y += 1) {
            if (y >= ySize) { continue; }
            i = (xSize * y + x) * 4;
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

    console.log('h: ' + h);

    //convert hue to wavelength
    //https://stackoverflow.com/questions/11850105/hue-to-wavelength-mapping
    // Estimating that the usable part of the visible spectrum is 450-620nm, 
    // with wavelength (in nm) and hue value (in degrees), you can improvise this:
    let wavelength = Math.ceil(620 - 170 / 270 * h);
    console.log('wavelength: ' + wavelength);

    //convert wavelength (nm) to frequency (THz)
    findFrequency(wavelength);

    return ("hsl(" + h + "," + s + "%," + l + "%)" + "; " + "wavelength: " + wavelength + ";  " + "frequency: " + findFrequency(wavelength));

    // return(wavelength);
  }
});

/////* FIND FREQUENCY */////
function findFrequency(wl) {
  let frequency;
  frequency = Math.ceil(3 * (Math.pow(10, 5)) / wl);
  console.log("frequency: " + frequency);

  playFreq(frequency);
  return frequency;
}


/////////* PLAY PITCH  *////////
//set up color + pitch frequency
let lowColFreq = 400;
let highColFreq = 789;
let lowPitchFreq = 120;
let highPitchFreq = 2000;

///// * PLAY COLOR FREQ */////////
function playFreq(frequency) {
  let freqPitch = Math.floor(mapRange(frequency, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
  console.log("freq pitch: " + freqPitch);
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






/*
thecanvas.addEventListener('mousemove', function (e) {
console.log(e.x, e.y);
socket.emit('coordinates', {
  x: e.x,
  y: e.y
});
});
*/

/// SOCKET PORTION //////


/* FOR SOCKET
//send over to socket
socket.emit('dataurl', dataUrl);
*/

    // document.getElementById('imagefile').src = dataUrl;

    // Draw again in 3 seconds
    // setTimeout(draw, 3000);

/*
//listen for connect
var socket = io.connect();
socket.on('connect', function () {
  console.log("Connected");
});

//listen for coordinates
socket.on('coordinates', function (data) {
  document.getElementById('thediv').style.position = "absolute";
  document.getElementById('thediv').style.top = data.x + "px";
  document.getElementById('thediv').style.left = data.y + "px";
});

//listen for dataurl
socket.on('dataurl', function (data) {
  console.log("Got Data");
  //var theimage = document.getElementById('theimage');

  var theimage = document.createElement("img");
  theimage.src = data;
  document.body.appendChild(theimage);

});
*/


//////* REFERENCE CODE *//////////

// function updateCanvas() {
//   let video = document.getElementById('thevideo');
//   let canvas = document.getElementById('thecanvas');
//   let ctx = canvas.getContext('2d');

//   ctx.drawImage(video, 0, 0);

//   let options = {
//     pixelWidth: 8,
//     pixelHeight: 8
//   };

//   let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   Pixelate(imageData, imageData, options);
//   ctx.putImageData(imageData, 0, 0);

//   //setup the animation loop. starts when the video begins to play
//   video.onplay = function (e) {
//     setTimeout(function () {
//       setInterval(updateCanvas, 30);
//       let video = document.getElementById('thevideo');
//       let canvas = document.getElementById('thecanvas');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//     }, 1000);
//   };
// }

