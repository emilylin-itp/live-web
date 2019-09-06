//By: Emily Lin
//Date: September 6, 2019


function init() {
    //SET UP VOLUME
    let video = document.getElementById('video');
    video.volume = 0.5;

    //SET UP VARIABLES
    let letterE = document.getElementById('letter_E');
    let letterM = document.getElementById('div_M');
    let letterI = document.getElementById('div_I');
    let letterL = document.getElementById('div_L');
    let letterY = document.getElementById('div_Y');
    let mouth = document.getElementById('div_mouth');
    let eyeLeft = document.getElementById('div_eye_left');
    let eyeRight = document.getElementById('div_eye_right');


    //LETTER E - change video and color
    letterE.addEventListener('click', () => {
        videoE();
        colorE();
    });

    //LETTER M - change video and color
    letterM.addEventListener('click', () => {
        videoM();
        colorM();
    });

    //LETTER I - change video and color
    letterI.addEventListener('click', () => {
        videoI();
        colorI();
    });

    //LETTER L - change video and color
    letterL.addEventListener('click', () => {
        videoL();
        colorL();
    });

    //LETTER Y - change video and color
    letterY.addEventListener('click', () => {
        videoY();
        colorY();
    });

    //MOUTH - change video and color
    mouth.addEventListener('click', () => {
        videoMouth();
        colorMouth();
    });

    //EYE LEFT - volume down
    eyeLeft.addEventListener('click', volumeDown);

    //EYE RIGHT - volume up
    eyeRight.addEventListener('click', volumeUp);
}

///////* CHANGE VIDEO WHEN LETTER BUTTON IS CLICKED */////////
function videoE() {
    document.getElementById('video').src = 'assets/bacon_pancakes.mp4';
}

function videoM() {
    document.getElementById('video').src = 'assets/penguin_trips.mp4';
}

function videoI() {
    document.getElementById('video').src = 'assets/vhs_glitch.mp4';
}

function videoL() {
    document.getElementById('video').src = 'assets/hitchikers_guide.mp4';
}

function videoY() {
    document.getElementById('video').src = 'assets/bob_ross.mp4';
}

function videoMouth() {
    document.getElementById('video').src = 'assets/these_lumps.mp4';
}

///////* CHANGE VOLUME WHEN LETTER BUTTON IS CLICKED */////////
function volumeDown() {
    let video = document.getElementById('video');

    if (video.volume <= 1) {
        video.volume -= 0.1;
    }

    if(video.volume <= 0.1){
        alert('MIN VOLUME!');
    }
}

function volumeUp() {
    let video = document.getElementById('video');

    if (video.volume >= 0) {
        video.volume += 0.1;
    }

    if(video.volume >= 0.9){
        alert('MAX VOLUME!');
    }
}



///////* CHANGE COLOR OF LETTER WHEN BUTTON IS CLICKED */////////
function colorE() {
    document.getElementById('letter_E').style.backgroundImage = "url('assets/e_pink.svg')";
    document.getElementById('letter_M').style.backgroundImage = "url('assets/m_pink.svg')";
    document.getElementById('letter_I').style.backgroundImage = "url('assets/i_pink.svg')";
    document.getElementById('letter_L').style.backgroundImage = "url('assets/l_pink.svg')";
    document.getElementById('letter_Y').style.backgroundImage = "url('assets/y_pink.svg')";
    document.getElementById('mouth').style.backgroundImage = "url('assets/mouth_pink.svg')";
    document.getElementById('eye_left').style.backgroundImage = "url('assets/minus_left_pink.svg')";
    document.getElementById('eye_right').style.backgroundImage = "url('assets/plus_right_pink.svg')";
}

function colorM() {
    document.getElementById('letter_E').style.backgroundImage = "url('assets/e_yellow.svg')";
    document.getElementById('letter_M').style.backgroundImage = "url('assets/m_yellow.svg')";
    document.getElementById('letter_I').style.backgroundImage = "url('assets/i_yellow.svg')";
    document.getElementById('letter_L').style.backgroundImage = "url('assets/l_yellow.svg')";
    document.getElementById('letter_Y').style.backgroundImage = "url('assets/y_yellow.svg')";
    document.getElementById('mouth').style.backgroundImage = "url('assets/mouth_yellow.svg')";
    document.getElementById('eye_left').style.backgroundImage = "url('assets/minus_left_yellow.svg')";
    document.getElementById('eye_right').style.backgroundImage = "url('assets/plus_right_yellow.svg')";
}

function colorI() {
    document.getElementById('letter_E').style.backgroundImage = "url('assets/e_pink.svg')";
    document.getElementById('letter_M').style.backgroundImage = "url('assets/m_yellow.svg')";
    document.getElementById('letter_I').style.backgroundImage = "url('assets/i_blue.svg')";
    document.getElementById('letter_L').style.backgroundImage = "url('assets/l_purple.svg')";
    document.getElementById('letter_Y').style.backgroundImage = "url('assets/y_turq.svg')";
    document.getElementById('mouth').style.backgroundImage = "url('assets/mouth_orange.svg')";
    document.getElementById('eye_left').style.backgroundImage = "url('assets/minus_left_green.svg')";
    document.getElementById('eye_right').style.backgroundImage = "url('assets/plus_right_magenta.svg')";
}

function colorL() {
    document.getElementById('letter_E').style.backgroundImage = "url('assets/e_purple.svg')";
    document.getElementById('letter_M').style.backgroundImage = "url('assets/m_purple.svg')";
    document.getElementById('letter_I').style.backgroundImage = "url('assets/i_purple.svg')";
    document.getElementById('letter_L').style.backgroundImage = "url('assets/l_purple.svg')";
    document.getElementById('letter_Y').style.backgroundImage = "url('assets/y_purple.svg')";
    document.getElementById('mouth').style.backgroundImage = "url('assets/mouth_purple.svg')";
    document.getElementById('eye_left').style.backgroundImage = "url('assets/minus_left_purple.svg')";
    document.getElementById('eye_right').style.backgroundImage = "url('assets/plus_right_purple.svg')";
}

function colorY() {
    document.getElementById('letter_E').style.backgroundImage = "url('assets/e_turq.svg')";
    document.getElementById('letter_M').style.backgroundImage = "url('assets/m_turq.svg')";
    document.getElementById('letter_I').style.backgroundImage = "url('assets/i_turq.svg')";
    document.getElementById('letter_L').style.backgroundImage = "url('assets/l_turq.svg')";
    document.getElementById('letter_Y').style.backgroundImage = "url('assets/y_turq.svg')";
    document.getElementById('mouth').style.backgroundImage = "url('assets/mouth_turq.svg')";
    document.getElementById('eye_left').style.backgroundImage = "url('assets/minus_left_turq.svg')";
    document.getElementById('eye_right').style.backgroundImage = "url('assets/plus_right_turq.svg')";
}

function colorMouth() {
    document.getElementById('letter_E').style.backgroundImage = "url('assets/e_orange.svg')";
    document.getElementById('letter_M').style.backgroundImage = "url('assets/m_orange.svg')";
    document.getElementById('letter_I').style.backgroundImage = "url('assets/i_orange.svg')";
    document.getElementById('letter_L').style.backgroundImage = "url('assets/l_orange.svg')";
    document.getElementById('letter_Y').style.backgroundImage = "url('assets/y_orange.svg')";
    document.getElementById('mouth').style.backgroundImage = "url('assets/mouth_orange.svg')";
    document.getElementById('eye_left').style.backgroundImage = "url('assets/minus_left_orange.svg')";
    document.getElementById('eye_right').style.backgroundImage = "url('assets/plus_right_orange.svg')";
}

window.addEventListener('load', init);	





////////////////* DUMPSTER CODE *///////////////

// function volumeDown() {
//     document.getElementById('video').volume = 0.1;
// }

// function volumeUp() {
//     document.getElementById('video').volume = 1;
// }



// Initial volume of 0.20
// Make sure it's a multiple of 0.05

//SET INTIAL VOLUME AT 0.5

/*
var myimgobj = document.images.jsVolumeButton.onclick();
var mysoundobj = document.sounds.player;
function onclick() {
 if(document.getElementById('player').volume === 0){
     document.getElementById('player').volume = 1;
 }else
    document.getElementById('player').volume -= 0.1; 
    return true;
}
*/


// function videoEyeLeft() {
//     document.getElementById('video').src = 'assets/asmr_sand.mp4';
// }

// function videoEyeRight() {
//     document.getElementById('video').src = 'assets/bob_ross.mp4';
// }
