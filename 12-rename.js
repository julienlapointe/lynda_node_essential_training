// this file renames and moves other files

// add the NodeJS "file system" module ("fs")
const fs = require("fs");

// renames a file (note: same process can be used to rename folders)
// synchronous
fs.renameSync("./12-lib/project-config.js", "./12-lib/config.json");

// this console.log() only gets printed to console *after* the fs.renameSync() renames the file because it is a synchronous method
console.log("project-config was renamed successfully!");

// moves a file (note: same process can be used to move folders)
// asynchronous
fs.rename("./12-lib/notes.md", "./notes.md", function(err) {
	// if there is an error, then...
	if (err) {
		// show error
		console.log(err);
	// otherwise, there is no error...
	} else {
		// print success message
		console.log("notes.md moved successfully!");
	}
});