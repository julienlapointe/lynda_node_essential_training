// this file create a markdown file

// add the NodeJS "file system" module ("fs")
const fs = require("fs");

// create markdown to saved into a file
// NOTE: markdown honors white space
var md = `

Sample Markdown Title
=====================

Sample Subtitle
---------------

* bullet
* bullet
* bullet

`;

// write the mardown stored in the "md" var to a file called sample.md
// param #1: name of file to create
// param #2: contents to put in file
// param #3: callback function to run upon file creation (can be used to catch errors)
fs.writeFile("sample.md", md.trim(), function(err) {
	console.log("File created!")
})