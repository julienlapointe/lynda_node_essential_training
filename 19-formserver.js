// this file creates an API server that can receive data from the user / client via POST requests

// add the NodeJS "HTTPS" module
const http = require("http");
// add the NodeJS "file system" module ("fs")
const fs = require("fs");

// create the HTTP server *chained* with the "listen" function (no need to create an instance of the server called "server" as in 16-server.js)
http.createServer(function(req, res) {
	// if the user / client's request uses the "GET" method, then... 
	if (req.method === "GET") {
		// write the header
		res.writeHead(200, {"Content-Type": "text/html"});
		// find form.html and send it back to user / client in response
		// "stream" form.html to the user / client
	    fs.createReadStream("./public/form.html", "UTF-8").pipe(res);
	// if the user / client's request uses the "POST" method, then... 
	} else if (req.method === "POST") {
		// initialize a variable to store the data in the "POST" request
		let body = "";
		// just like the "response" / "res" object, the "request" / "req" object is also a *stream* so we must concatenate the response body as it arrives in "chunks"
		// write incoming data from the "POST" request to the "body" var 
		req.on("data", function(chunk) {
			body += chunk;
		});
		req.on("end", function() {
			// write the header
			res.writeHead(200, {"Content-Type": "text/html"});
			// respond to the user / client by displaying the form entries submitted in their "POST" request
			res.end(`
				<!DOCTYPE html>
				<html>
					<head>
						<title>Form Results</title>
					</head>
					<body>
						<h1>Your Form Results</h1>
						<p>${body}</p>
					</body>
				</html>
			`);
		});
	}
}).listen(3000);

console.log("Form server listening on port 3000");