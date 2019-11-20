window.addEventListener('load', function () {
  // The video element on the page to display the webcam
  var video = document.getElementById('thevideo');

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

  // Canvas element on the page
  var canvas = document.getElementById('thecanvas');
  console.log(thecanvas);
  var context = canvas.getContext('2d');
  console.log(context);
  console.log(video);


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
      pixelWidth: 400,
      pixelHeight: 400
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



    /* FOR SOCKET
    //send over to socket
    socket.emit('dataurl', dataUrl);
    */

    // document.getElementById('imagefile').src = dataUrl;

    // Draw again in 3 seconds
    // setTimeout(draw, 3000);
  };

  function updateCanvas() {
    let video = document.getElementById('thevideo');
    let canvas = document.getElementById('thecanvas');
    let ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0);

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

  // Pixelate function 
  // Code from here: http://blog.acipo.com/js-canvas-pixelate/
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
});


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

