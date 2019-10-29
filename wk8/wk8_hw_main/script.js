window.addEventListener('load', init);

//global var
let recButton;



function init() {

    // on click -- start recording 
    recButton = document.getElementById('rec-h2');
    recButton.addEventListener('click', startRecord);
}


function startRecord() {
    recButton = document.getElementById('rec-h2');
    recButton.fill = '#FF0000';
    console.log('start recording!');
}