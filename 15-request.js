// this file makes an HTTPS request to Wikipedia (must use HTTPS because Wikipedia's page uses HTTPS: https://en.wikipedia.org/wiki/Steve_Jobs)

// add the NodeJS "HTTPS" module
const https = require("https");
// add the NodeJS "file system" module ("fs")
const fs = require("fs");

// options for the HTTPS request
const options = {
	hostname: "en.wikipedia.org",
	// default port for HTTP (insecure) sites = 80
	// default port for HTTPS (secure) sites = 443
	port: "443",
	path: "/wiki/Steve_Jobs",
	method: "GET"
};

// .request() method allows a NodeJS server to make external requests (ex. to APIs) 
// the callback function fires once the HTTP/HTTPS request has *started* (because the .request() method uses the "res" / "response" object *implements the stream interface* so the response gets read "chunk-by-chunk" as opposed to all at once)
let req = https.request(options, function(res) {
	// initialize var to store response from Wikipedia (concatenate each chunk as it is received into the "responseBody" var)
	let responseBody = "";
	console.log("Response from server has started...");
	console.log(`Server status: ${res.statusCode}`);
	// %j prints res.headers in JSON format 
	console.log("Response headers: %j", res.headers);
	// note: default encoding on stream is *binary*
	res.setEncoding("UTF-8");
	res.once("data", function(chunk) {
		console.log(chunk);
	});
	res.on("data", function(chunk) {
		console.log(`--chunk-- ${chunk.length} `);
		responseBody += chunk;
	});
	res.on("end", function() {
		fs.writeFile("steve-jobs.html", responseBody, function(err) {
			if (err) {
				throw err;
			}
			console.log("File downloaded successfully!");
		});
	});
});

req.on("error", function(err) {
	console.log(`Error with request: ${err.message}`);
});

req.end();