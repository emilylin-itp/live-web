function init() {
    let randomizeButton = document.getElementById('bttn');

    //when button click perform getOriginal function
    randomizeButton.addEventListener('click', getOriginal);
}

function getOriginal() {
    //prompts user to write message, stores string into var ogMessage
    let ogMessage = prompt("Please write your message", "");

    //the message is not null put the user message into the innet html
    if (ogMessage != null) {
        document.getElementById("ogMessage").innerHTML =
            "this is your original message: " + ogMessage;
    }

    //console og message + var type
    console.log(ogMessage, typeof ogMessage);

    //perform replace function
    randomizeMessage(ogMessage);
}

function randomizeMessage(ogMessage) {
    let array = ogMessage.split('');
    let i = Math.floor(Math.random() * array.length);

    array[i] = String.fromCharCode(array[i].charCodeAt(0) + 2 * Math.floor(Math.random() * 2) - 1);
    return array.join('');

}

// console.log(replace('123456abcdef'));

window.addEventListener('load', init);	