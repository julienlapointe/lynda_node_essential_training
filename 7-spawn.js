// run Linux commands in Terminal using the child_process.spawn() method from the NodeJS "child_process" module
// when 7-spawn.js is run ("node 7-spawn.js" in the Terminal), then it is the "parent process"
// the "parent process" (this file), then *spawns* a "child process" (7-alwaysTalking.js) using the line:
// spawn("node", ["7-alwaysTalking.js"]);

// the NodeJS "child_process" module *contains* the "spawn" function
const spawn = require("child_process").spawn;

// create a variable for the "child process"
// param #1: command to run in Terminal (ex. "node")
// param #2: array of commands / arguments that follow the 1st command / argument (ex. "alwaysTalking.js", which produces the complete command "node alwaysTalking.js") 
let cp = spawn("node", ["7-alwaysTalking.js"]);

// the "cp" instance can listen for "data" events on the stdout object...
// in this example, alwaysTalking represents the "child process"
cp.stdout.on("data", function(data) {
	console.log(`STDOUT: ${data.toString()}`);
});

// listen for when the "child process" closes / alwaysTalking process ends
cp.on("close", function() {
	console.log("Child Process has ended.");
	// exit this process when the alwaysTalking process ends
	process.exit();
});

// 
// after 4 seconds has passed, user can stop the "child process" / alwaysTalking by typing "stop" into the command prompt / Terminal
setTimeout(function() {
	cp.stdin.write("stop");
}, 4000);