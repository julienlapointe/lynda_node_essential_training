// this file reads file in the "8-lib" folder

// add the NodeJS "file system" module ("fs")
const fs = require("fs");

// param #1: file to read (sayings.md = "markdown" file)
// param #2: text encoding 
// synchronous
// let contents = fs.readFileSync("./8-lib/sayings.md", "UTF-8");
// asynchronous
fs.readFile("./08-lib/sayings.md", "UTF-8", function(err, contents) {
	if (err) {
		console.log(err);
	}
	console.log(contents);
});

// print contents of sayings.md to console
// synchronous
// console.log(contents);

// PURPOSE: read contents of *all* files in a directory

// add the NodeJS "path" module
var path = require("path");

// read all files / folders in the "./8-lib" folder
// this reads people.json and sayings.md, but not the contents of the "scripts" sub-folder
fs.readdir("./08-lib", function(err, files) {
	// for each file / folder in the "./8-lib" folder...
	files.forEach(function(fileName) {
		// create a full path to the file
		let file = path.join(__dirname, "08-lib", fileName);
		// get stats about the file / folder (is it a file or a folder?)
		let stats = fs.statSync(file);
		// if it is a file AND it isn't the Mac .DS_STORE file, then...
		if (stats.isFile() && fileName !== ".DS_STORE") {
			// read the file as text with UTF-8 encoding
			fs.readFile(file, "UTF-8", function(err, contents) {
				// print the contents of the file to the console
				console.log(contents);
			});
		}
	});
});