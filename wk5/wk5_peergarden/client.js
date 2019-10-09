//socket.on()

// We'll use a global variable to hold on to our id from PeerJS
var peer_id = null;

// I setup a peer server on a Digital Ocean instance for our use, you can use that with the following constructor:
var peer = new Peer({ host: 'liveweb-new.itp.io', port: 9000, path: '/' });


// Get an ID from the PeerJS server
peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
    peer_id = id;

    //get my id text area, display my peer id in the text area
    let myid_text = document.getElementById('mypeerid');
    myid_text.innerHTML = peer_id;
    //console.log('peer_id: ' + peer_id);
});

peer.on('error', function (err) {
    console.log(err);
});

// ANSWER CALL        
peer.on('call', function (incoming_call) {
    console.log("Got a call!");
    incoming_call.answer(my_stream); // Answer the call with our stream from getUserMedia
    incoming_call.on('stream', function (remoteStream) {  // we receive a getUserMedia stream from the remote caller

        console.log('answer call! supposed to display stream from the remote caller');

        //THIS WAS APPENDING OTHER PEOPLE'S VIDEOS WHEN USER CALLS 

        // // And attach it to a video object
        // var ovideoElement = document.createElement('video');
        // // ovideoElemnt.id = "something";
        // ovideoElement.srcObject = remoteStream;
        // //ovideoElement.src = window.URL.createObjectURL(remoteStream) || remoteStream;
        // ovideoElement.setAttribute("autoplay", "true");
        // ovideoElement.play();
        // document.body.appendChild(ovideoElement);
    });
});

/* Get User Media */
let my_stream = null;

// Constraints - what do we want?
let constraints = { audio: false, video: true }

window.addEventListener('load', function () {

    ///////* WEB SOCKET PORTION *//////
    let socket = io.connect();

    ////////* STREAM PORTION *////////

    // MAKE CALL
    // Prompt the user for permission, get the stream
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        /* Use the stream */

        // Attach to our video object
        var videoElement = document.getElementById('myvideo');
        videoElement.srcObject = stream;

        // Global for stream
        my_stream = stream;

        // Old way to write. Wait for the stream to load enough to play
        // videoElement.onloadedmetadata = function(e) {
        //     videoElement.play();
        // };

        videoElement.addEventListener('loadedmetadata', function (e) {
            videoElement.play();
        });
    })
        .catch(function (err) {
            /* Handle the error */
            alert(err);
        });

    ////////* SOCKET CLIENT PORTION *////////
    socket.on('connect', function () {
        console.log("Connected");
    });

    //when submitbutton is pressed, perform sendPeerId function
    submitbutton = document.getElementById('submit');
    submitbutton.addEventListener('click', () => {
        sendPeerID();
        disableSubmit();
    });


    //send my peer id
    function sendPeerID() {
        let mypeerid = document.getElementById('mypeerid').value;
        console.log("sending: " + mypeerid);

        //send the peer id to server (perform sendPeerID function on server side)
        socket.emit('sendPeerId', mypeerid);

        //perform makeCall pass in my peerid
        // function makeCall(mypeerid);
    }

    // 1. receive other peer id, then display in div
    // 2. make call to other peerid
    socket.on('otherPeerId', function (data) {
        let otherDiv = document.getElementById('otherid-div');

        //display peer id in div
        otherDiv.innerHTML += data + "<br />";
        console.log("other peer id is received: " + data);


        //call the function
        makeCall(data);

        // function makes call. passing in data which is other peer id
        function makeCall(data) {
            let call = peer.call(data, my_stream);

            call.on('stream', function (remoteStream) {
                console.log("Got remote stream");

                let ovideoElement = document.createElement('video'); //create video element                 
                ovideoElement.srcObject = remoteStream; //src of video element is the stream      
                ovideoElement.setAttribute("autoplay", "true");
                ovideoElement.play();
                document.body.appendChild(ovideoElement);
                console.log(ovideoElement);
            });
        }
    });

    //disable submit button after 1 click
    function disableSubmit() {
        let submitButton = document.getElementById("submit");
        submitButton.disabled = true;
    }

});