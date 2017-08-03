// this file creates a WebSocket *server*
// this file runs on the *server*

// add the NPM "ws" (WebSocket) module
// chain on the .Server method?
const WebSocketServer = require("ws").Server;
// create an instance of the WebSocketServer 
// open in browser via wss:// (as opposed to http://)
const wss = new WebSocketServer({ port: 3000 });

// listener for new WebSocket connections
// param: "ws" = the WebSocket connection = the connection with the client / user
// every client / user who connects (visits our app) with cause this callback function to fire
wss.on("connection", function(ws) {
	// send a message back to each client / user upon successfully establishing a WebSocket connection
	ws.send("Welcome to cyber chat");

	// if a client / user sends the message "exit", then...
	ws.on("message", function(message) {
		if (message === "exit") {
			// close their WebSocket connection (note: the WebSocket server is still running)
			ws.close();
		// otherwise, broadcast this WebSocket client's message to ALL the connected WebSocket clients 
		} else {
			// wss.clients = array of all connected clients
			wss.clients.forEach(function(client) {
				// for each client, send the message
				client.send(message);
			});
		}
	});
});