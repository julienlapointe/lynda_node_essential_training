// this file creates an HTTP server and responds to requests with the appropriate resources from the "public" folder

// add the NodeJS "HTTP" module
const http = require("http");
// add the NodeJS "file system" module ("fs")
const fs = require("fs");
// add the NodeJS "path" module
const path = require("path");

// create the HTTP server *chained* with the "listen" function (no need to create an instance of the server called "server" as in 16-server.js)
// http://localhost:3000 = "server"
// / or /style.css or /bird.jpg = "url" (see below)
http.createServer(function(req, res) {
	// output details re: the HTTP request
	console.log(`${req.method} request for ${req.url}`);
	// if request is for root, then...
	if (req.url === "/") {
		// read / find index.html in the "public" folder and send it back to the user / client
		fs.readFile("./public/index.html", "UTF-8", function(err, html) {
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(html);
		});
	// 
	} else if (req.url.match(/.css$/)) {
		// path to CSS file
		const cssPath = path.join(__dirname, "public", req.url);
		// create a "read stream"
		// "chunks" of data are "piped" / sent to the "res" object (which implements the "stream interface")
		let fileStream = fs.createReadStream(cssPath, "UTF-8");
		// write the response header
		res.writeHead(200, {"Content-Type": "text/css"});
		// "pipe" / send the "read stream" from above into the "write stream" below
		// The pipe() function reads data from a readable stream as it becomes available and writes it to a destination writable stream (https://stackoverflow.com/questions/20085513/using-pipe-in-node-js-net)
		// the "read stream" called fileStream "pipes" data in "chunks" from the file (.css in this case) into "res", which is a writeable stream object
		fileStream.pipe(res);
	} else if (req.url.match(/.jpe?g$/)) {
		// same steps as above (exept for JPEG/JPG file instead of CSS)
		const imgPath = path.join(__dirname, "public", req.url);
		let imgStream = fs.createReadStream(imgPath);
		res.writeHead(200, {"Content-Type": "image/jpeg"});
		imgStream.pipe(res);
	} else {
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.end("404 Error: File not found.")
	}
}).listen(3000);

console.log("File server is running on port 3000...");