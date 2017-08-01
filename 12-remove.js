// this file deletes / removes other files

// add the NodeJS "file system" module ("fs")
const fs = require("fs");

// Note re: ***catching*** vs. ***throwing*** errors
// use a "try-catch" statement to ***catch**** errors from synchronous methods (otherwise, the error causes the program to crash)
// ***throwing*** an error causes the program to crash
try {
	// remove a file
	// synchronous
	fs.unlinkSync("./12-lib/config.json");
// if an error was caught, then...
} catch (err) {
	// print error to console
	console.log(err);
}

// remove a file
// asynchronous
fs.unlink("notes.md", function(err) {
	// if there is an error, then...
	if (err) {
		// show error
		console.log(err);
	// otherwise, there is no error...
	} else {
		// print success message
		console.log("notes.md removed successfully!");
	}
});

// delete / remove the "test" sub-folder from the "12-lib" folder
// see note below
// asynchronous
fs.rmdir("./12-lib/test", function(err) {
	// if there is an error, then...
	if (err) {
		// throw error
		throw (err);
	// otherwise, there is no error...
	} else {
		// print success message
		console.log(`The "test" sub-folder was removed successfully!`);
	}
});

// note: can only delete / remove *empty* folders (must first delete all files in a folder before deleting the folder itself) 
// the lines below use "method chaining" to (1) read all the files in a folder, then (2) remove each file
// use this code before trying to delete a folder
// fs.readdirSync("./logs").forEach(function(fileName) {
// 	fs.unlinkSync("./logs" + fileName);
// });