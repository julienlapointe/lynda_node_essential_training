// this file creates a static file server and API using ExpressJS
// the client application (in the "public" folder) is getting, posting, and deleting these terms to our web server application via the API

/* eslint-disable */

// Note: console.log() appears in the Terminal (*not* Google Chrome's console) when using NodeJS

// add the NPM "express" module
const express = require("express");
// add the NPM "cors" module
// "CORS" = Cross Origin Resource Sharing
// without cors(), you can only serve data to the same domain name that this server is running on
const cors = require("cors");
// add the NPM "body-parser" module
// "middleware" that parses incoming data sent via POST requests
// user-generated data submitted via input forms is URL-encoded
const bodyParser = require("body-parser");

// create an application instance of Express
const app = express();

// ski terms and definitions
let skierTerms = [
    {
        term: "Rip",
        defined: "To move at a high rate of speed"
    },
    {
        term: "Huck",
        defined: "To throw your body off of something, usually a natural feature like a cliff"
    },
    {
        term: "Chowder",
        defined: "Powder after it has been sufficiently skied"
    }
];

// parse incoming JSON data
app.use(bodyParser.json());
// parse incoming URL-econded data
// param: "extended: true" is only for LARGE amounts of data 
app.use(bodyParser.urlencoded({ extended: false }));

// custom "middleware" function
// our app will run this callback function every time it receives an HTTP request
// param #1: the HTTP request
// param #2: the HTTP response
// param #3: the next function to invoke once this "middleware" function has run (essentially we are creating a "pipeline" of code to run on each incoming HTTP request)
// note: the "${JSON.stringify(req.body)}" logs any incoming data sent via POST requests
app.use(function(req, res, next) {
	// log details about the incoming HTTP request
	console.log(`${req.method} request for ${req.url} - ${JSON.stringify(req.body)}`);
	// tell the Express app to move on to the *next* "middleware" (the express.static() static file server in this case)
	next();
});

// "middleware" ≈ (approximately equals) "plugins that extend Express to add functionality to our app"
// add / use the "static file server" that comes with Express
// param: folder / directory to serve static files from
app.use(express.static("./public"));

// cors() is a function that returns some "middleware"
// cors() allows you to open up your API to other servers / domains names
app.use(cors());

// add Express routes
// handle GET requests
app.get("/dictionary-api", function(req, res) {
	res.json(skierTerms);
	// Express adds a .json() method that replaces the lines below:
	// res.writeHead(200, {"Content-Type": "text/json"});
	// res.end(JSON.stringify(data));
});

// handle POST requests
app.post("/dictionary-api", function(req, res) {
	// add new term / definition to array of terms / definitions
    skierTerms.push(req.body);
    res.json(skierTerms);
});

// handle DELETE requests
app.delete("/dictionary-api/:term", function(req, res) {
	// remove new term / definition to array of terms / definitions
	// use the .filter() "predicate" method for JS arrays
	// "predicate" means that it returns either TRUE or FALSE for each item of the "skierTerms" array
    skierTerms = skierTerms.filter(function(definition) {
    	// if the condition "definition.term.toLowerCase() !== req.params.term.toLowerCase()" evaluates to TRUE, then the item is ADDED to the new "skierTerms" array (items that evaluate to FALSE are ignored / discarded)
        return definition.term.toLowerCase() !== req.params.term.toLowerCase();
    });
    res.json(skierTerms);
});

// tell the Express app to listen on port 3000 for incoming HTTP requests
app.listen(3000);

console.log("Express app running on port 3000...");

// export this app instance as a module to be included in other files (ex. for testing)
module.exports = app;