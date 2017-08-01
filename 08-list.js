// this file lists the contents of "8-lib" folder

// add the NodeJS "file system" module ("fs")
const fs = require("fs");

// "fs.readdirSync" reads the files *synchronously*, meaning it *blocks* the code from progressing to the "console.log(files);" line until the files in the "./8-lib" folder have been read
// synchronously
// let files = fs.readdirSync("./08-lib");
// asynchronously
fs.readdir("./08-lib", function(err, files) {
	if (err) {
		throw err;
	} else {
		console.log(files);
	}
});

// output files from the "./8-lib" folder
// synchronously
// console.log(files);
// asynchronously
console.log("Reading files...");