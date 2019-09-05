// window.addEventListener('load', init);

//list for event click over div X 
// perform function of switing video backgrounds


function init(){
    let letterE = document.getElementById('letter_E');
    let letterM = document.getElementById('div_M');
    let letterI = document.getElementById('div_I');
    let letterL = document.getElementById('div_L');
    let letterY = document.getElementById('div_Y');
    let mouth = document.getElementById('div_mouth');
    let eyeLeft = document.getElementById('div_eye_left');
    let eyeRight = document.getElementById('div_eye_right');
    letterE.addEventListener('click', videoE);
    letterM.addEventListener('click', videoM);
    letterI.addEventListener('click', videoI);
    letterL.addEventListener('click', videoL);
    letterY.addEventListener('click', videoY);
    mouth.addEventListener('click', videoMouth);
    eyeLeft.addEventListener('click', videoEyeLeft);
    eyeRight.addEventListener('click', videoEyeRight);
}

/* 
//IF VIDEO CONTAINS THESE WORDS THEN CHANGE THE COLOR OF THE SHAPE OR TEXT
if(document.video.source.contains("bacon_pancakes")){
    document.getElementById('letter_E').style.backgroundImage = "url('assets/e_white.svg')";
} else{
    document.getElementById('letter_E').style.backgroundImage = "url('assets/e_pink.svg')";
}
*/


function videoE(){
    document.getElementById('video').src = 'assets/bacon_pancakes.mp4';
    // document.getElementById('letter_E').style.backgroundImage = "url('assets/e_white.svg')";
}

function videoM(){
    document.getElementById('video').src = 'assets/penguin_trips.mp4';
}

function videoI(){
    document.getElementById('video').src = 'assets/vhs_glitch.mp4';
}

function videoL(){
    document.getElementById('video').src = 'assets/space.mp4';
}

function videoY(){
    document.getElementById('video').src = 'assets/largest_pizza.mp4';
}

function videoMouth(){
    document.getElementById('video').src = 'assets/these_lumps.mp4';
}

function videoEyeLeft(){
    document.getElementById('video').src = 'assets/asmr_sand.mp4';
}

function videoEyeRight(){
    document.getElementById('video').src = 'assets/bob_ross.mp4';
}

window.addEventListener('load', init);	


/*
<div class="source" id="source_one">Source 1</div>
<video id="example_video_1" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="none" width="640" height="360" poster="" data-setup="{}">
    <source id="source_video" src="example_video_1.mp4" type='video/mp4' />
</video>

<script>
  document.getElementById('source_one').addEventListener('click', function() {
    document.getElementById('source_video').src = 'example_video_2.mp4';
  });
</script>
*/