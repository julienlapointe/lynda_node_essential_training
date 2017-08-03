// this file creates a WebSocket *client*
// this file runs on the *client* / *browser*

// create a WebSocket() instance 
var ws = new WebSocket("ws://localhost:3000");

// when WebSocket connection opens / is established, set the title in <h1> tag of index.html
ws.onopen = function() {
	setTitle("Connected to Cyber Chat");
};

// when WebSocket connection closes, set the title in <h1> tag of index.html
ws.onclose = function() {
	setTitle("DISCONNECTED");
};

// when this WebSocket client *sends* a message, print the message to this page (index.html)
ws.onmessage = function(payload) {
	printMessage(payload.data);
};

// this function fires whenever a user submits a new message via the input form in index.html
document.forms[0].onsubmit = function () {
    var input = document.getElementById('message');
    ws.send(input.value);
    input.value = '';
};

// this function changes the title in the <h1> tag in index.html
function setTitle(title) {
    document.querySelector('h1').innerHTML = title;
}

// this function adds the new message to the page (index.html)
function printMessage(message) {
    var p = document.createElement('p');
    p.innerText = message;
    document.querySelector('div.messages').appendChild(p);
}