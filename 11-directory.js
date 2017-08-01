// this file creates a folder

// add the NodeJS "file system" module ("fs")
const fs = require("fs");

// check if the folder "11-lib" already exists
// perform this check synchronously so that fs.mkdir() doesn't run before we know if the folder already exists  
if (fs.existsSync("11-lib")) {
	console.log("Folder already exists...")
} else {
	// create a new folder called "11-lib"
	// NOTE: cannot run more than 1x because "11-lib" folder already exists so it will throw an error...
	fs.mkdir("11-lib", function(err) {
		console.log("Folder created!");
	});
}

