// the "readline" module is a wrapper for the stdin and stdout objects that allows us to ask the user questions via the Terminal / command prompt
const readline = require("readline");

// create an instance of "readline"
// param #1: input <Readable> The Readable stream to listen to. This option is required.
// param #2: output <Writable> The Writable stream to write readline data to.
let rl = readline.createInterface(process.stdin, process.stdout);

// use "readline"'s .question() method to display a question
// upon receiving a response, the .question method calls the callback function with the "answer" as the parameter 
rl.question("What is your favorite color?", function(answer) {
	console.log(answer);
});