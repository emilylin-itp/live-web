function init() {
    let randomizeButton = document.getElementById('bttn');

    //when button is clicked perform getOriginal function
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

    //call randomizeMessage function
    randomizeMessage(ogMessage);
}

function randomizeMessage(x) {
    //make the string into an array
    let array = x.split('');

    //random number of characters to replace
    let randomNum = Math.floor(Math.random() * array.length); 

    //everytime you go through for loop 
    for(let i = 0; i < )
}

// console.log(replace('123456abcdef'));

window.addEventListener('load', init);	


    // //onlny replaces one character
    // gets unicode character of --> going and finding utf of character --> adding random number changes index of utf, string fromCharCode 
    // there is a library utf, to access letters and numbers you need to say "String.fromCharCode", then you give it a number,
    // array[i] = String.fromCharCode(array[i].charCodeAt(0) + 2 * Math.floor(Math.random() * 2) - 1);
    // return array.join('');