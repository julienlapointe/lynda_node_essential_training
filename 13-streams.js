// this file reads the "chat.log" file in a "read stream" as opposed to using the "fs.readFile()" method
// "fs.readFile()" reads the entire file's contents, then returns it
// if the file is very large, then "fs.readFile()" can slow down NodeJS
// using "fs.createReadStream()" reads part of the large file and intermittently returns a "chunk" (approx. 65,000 characters long) of its contents

// add the NodeJS "file system" module ("fs")
const fs = require("fs");

// create a "read stream"
var stream = fs.createReadStream("./chat.log", "UTF-8");

// create a var to concatenate chunks of the file's contents returned by the "fs.createReadStream()" method
let data = "";

// when first "chunk" of data is read, tell user (1x / once) that the reading process has started
stream.once("data", function() {
	console.log("\n\n\n");
	console.log("Started reading the file stream!");
	console.log("\n\n\n");
})

// listen for "data" events on the stream
// the "data" represents "chunks" of the file's contents being returned by the "fs.createReadStream()" method
stream.on("data", function(chunk) {
	process.stdout.write(`Chunk: ${chunk.length} | `);
	data += chunk;
});

// when "fs.createReadStream()" is done reading the file, output the file's length to the console
stream.on("end", function() {
	console.log("\n\n\n");
	console.log(`Finished reading the file stream! Total length: ${data.length}`);
	console.log("\n\n\n");
});