// run Linux commands in Terminal using the child_process.exec() method from the NodeJS "child_process" module

// the NodeJS "child_process" module *contains* the "exec" / execute function
const exec = require("child_process").exec

// examples of commands that exec() can run in the Terminal on our behalf
// exec("open http://www.lynda.com");
// exec("open -a Terminal .");

// run "ls" command in the Terminal
// param #1: Linux command to run
// param #2: callback function to run when command returns a value (ex. a list of files in the current working directory)
exec("ls", function(err, stdout) {
	// if command results in an error...
	if (err) {
		// then, the application crashes and process exits
		throw err;
	} else {
		console.log("Listening finished.");
		// output response from the "ls" command (a list of files in the current working directory)
		// NOTE: "process.stdout.write" = "console.log"
		process.stdout.write(stdout);
	}
});