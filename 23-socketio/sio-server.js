// add the NPM "express" module
const express = require("express");
// add the NodeJS "HTTP" module
const http = require("http");

// create an instance of the Express module
const app = express();

// create an HTTP server on top of the Express instance that listens on port 3000
const server = http.createServer(app).listen(3000);
// add the NPM "socket.io" module
// put the Socket.io server on top of the Express HTTP server listening on port 3000
// note: must include the socket.io-client.js file in the "public" folder to run on the client / browser
const io = require("socket.io")(server);

// serve static files using the Express .use() function
app.use(express.static("./public"));

// upon establishing a new connection with a client
// param: "socket" = a single endpoing / connection to a client / user
io.on("connection", function(socket) {
	
	// emit a "welcome" message to the newly connected Socket.io client / user
	socket.emit("message", "Welcome to Cyber Chat");

	// when the "chat" event occurs, fire the callback function
    socket.on("chat", function(message) {
    	// emit the message to ALL other connected Socket.io clients / users
    	socket.broadcast.emit("message", message);
    });
});

console.log("Starting Socket App - http://localhost:3000");