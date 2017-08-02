/* eslint-disable */

// add the NodeJS "express" module
const express = require("express");

// create an application instance of Express
const app = express();

// custom "middleware" function
// our app will run this callback function every time it receives an HTTP request
// param #1: the HTTP request
// param #2: the HTTP response
// param #3: the next function to invoke once this "middleware" function has run (essentially we are creating a "pipeline" of code to run on each incoming HTTP request)
app.use(function(req, res, next) {
	// log details about the incoming HTTP request
	console.log(`${req.method} request for ${req.url}`);
	// tell the Express app to move on to the *next* "middleware" (the express.static() static file server in this case)
	next();
});

// "middleware" ≈ (approximately equals) "plugins that extend Express to add functionality to our app"
// add / use the "static file server" that comes with Express
// param: folder / directory to serve static files from
app.use(express.static("./public"));

// tell the Express app to listen on port 3000 for incoming HTTP requests
app.listen(3000);

console.log("Express app running on port 3000...");

// export this app instance as a module to be included in other files (ex. for testing)
module.exports = app;