//array for replacing characters with new ones
let globalArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V"];

function init() {
    let button = document.getElementById('bttn');

    button.addEventListener('mouseover', mouseOver);
    button.addEventListener('mouseout',mouseOut);

    //when button is clicked perform getOriginal function
    button.addEventListener('click', getOriginal);
}

function mouseOver(){
    document.getElementById("bttn").style.backgroundColor = 'yellow';
}

function mouseOut(){
    document.getElementById("bttn").style.backgroundColor = "white";
}

function getOriginal() {
    //prompts user to write message, stores string into var ogMessage
    let ogMessage = prompt("Please write your message", "");

    //the message is not null put the user message into the innet html
    if (ogMessage != null) {
        document.getElementById("ogMessage").innerHTML =
            "this is your original message: " + ogMessage;
    }

    console.log(ogMessage, typeof ogMessage);
    
    //call randomizeMessage function
    let newMessage = randomizeMessage(ogMessage);
    document.getElementById("gibberish").innerHTML = newMessage
}

function randomizeMessage(x) {
    //make the string into an characters
    let array = x.split('');

    //random number of characters to replace
    let randomNum = Math.floor(Math.random() * array.length);
    console.log("random num is " + randomNum);

    //getting a random index from for loop
    for (let i = 0; i < randomNum; i++) {

        //index numbers from random char in the message array
        let randomIndex = Math.floor(Math.random() * array.length);
        console.log("random index: " + randomIndex);

        //index numbers from random char in globalChar array
        let globalIndex = Math.floor(Math.random() * globalArr.length);
        console.log("global index: " + globalIndex);

        //find a character at that specific random number and then replace it with ? (as a test)
        //array[randomIndex] = "?";

        //replace the characters from [randomIndex] with characters from [globalIndex]
        array[randomIndex] = globalArr[globalIndex];
    }
    //make into a new string
    return array.join('');
}


console.log(randomizeMessage('hello this is my message'));

window.addEventListener('load', init);




////////////////////////DUMPSTER CODE//////////////////////////
    // //onlny replaces one character
    // gets unicode character of --> going and finding utf of character --> adding random number changes index of utf, string fromCharCode 
    // there is a library utf, to access letters and numbers you need to say "String.fromCharCode", then you give it a number,
    // array[i] = String.fromCharCode(array[i].charCodeAt(0) + 2 * Math.floor(Math.random() * 2) - 1);
    // return array.join('');