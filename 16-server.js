// this file creates a web server that responds to incomg HTTP requests with some <HTML code/>

// add the NodeJS "HTTPS" module
const http = require("http");

// create the HTTP server called "server"
// every request to "server" (host?) will trigger the callback function to run
// http://localhost:3000 = "server"
// / or /style.css or /bird.jpg = "url"
// must respond to the URL / route in the HTTP requests accordingly (ex. some requests may be asking for a specific file at /document.pdf or /user/profile or /login) and send back the appropriate *resource*
// callback function params:
	// param #1: req = headers, data, user / client info
	// param #2: res = initially blank
// Note: user / client sends BOTH "req" (with data) AND "res" (blank) objects to the server, the server fills the "res" with data, then sends it bac kto the user / client
const server = http.createServer(function(req, res) {
	// write the response headers
	// param #1: status code
	// param #2: object literal of other header data (ex. "Content-Type" tells the browser what type of data is contained in the response body)
	// res.writeHead(200, {"Content-Type": "text/plain"});
	res.writeHead(200, {"Content-Type": "text/html"});
	// "Hello World!" is the response body
	// res.end("Hello World!");
	res.end(`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<title>HTML Response</title>
				<meta charset="UTF-8"/>
			</head>
			<body>
				<h1>Serving HTML Text!</h1>
				<h3>Info about the HTTP request:</h3>
				<p>URL / Route requested: ${req.url}</p>
				<p>Request / Method type: ${req.method}</p>
			</body>
		</html>
	`);
});

// tell "server" what IP address + port to listen on for incoming HTTP requests
// "sever" will listen on port 3000 of *this local machine* (because no IP address was provided)
server.listen(3000);
console.log("Server listening on port 3000...");