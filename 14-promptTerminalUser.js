// this file writes to a .md file using a "write stream" as opposed to using the "fs.writeFile()" method

// add the NodeJS "file system" module ("fs")
const fs = require("fs");
// the "readline" module is a wrapper for the stdin and stdout objects that allows us to ask the user questions via the Terminal / command prompt
const readline = require("readline");

// create an instance of "readline"
// param #1: input <Readable> The Readable stream to listen to. This option is required.
// param #2: output <Writable> The Writable stream to write readline data to.
let rl = readline.createInterface(process.stdin, process.stdout);

// initialize var to hold name and sayings of a famous person
let famousPerson = {
	name: "",
	sayings: []
};

// use "readline"'s .question() method to display a question
// upon receiving a response, the .question method calls the callback function with the "answer" as the parameter 
// param #1: "prompt" (can be "reset" using setPrompt - see below)
// param #2: callback function to fire when prompt is answered
// in NodeJS docs:
	// param #1: query <string> A statement or query to write to output, prepended to the prompt.
	// param #2: callback <Function> A callback function that is invoked with the user's input in response to the query.
rl.question("What is the name of a famous person you admire? ", function(answer) {
	// store the famous person's name
	famousPerson.name = answer;

	// create the "write stream"
	// param = filename to write to
	var stream = fs.createWriteStream(famousPerson.name + ".md");
	// write to the file specified above using the "write stream"
	stream.write(`${famousPerson.name}\n====================\n\n`);
	
	// ask a new question / reset the "prompt" (param #1) in rl.question above
	rl.setPrompt(`What would ${famousPerson.name} say? `);
	// console.log(answer);
	// the prompt string to use. Default: '> '
	// rl.prompt(); must already be included in rl.question()...
	rl.prompt();
	// fires callback when user submits answer
	rl.on("line", function(saying) {
		// store saying in famousPerson object
		famousPerson.sayings.push(saying);
		
		// write the saying to the "write stream"
		stream.write(`* ${saying.trim()} \n`);

		// if Terminal user enters "exit"...
		if (saying.toLowerCase().trim() === "exit") {
			// pop off the "exit" string from famousPerson.sayings array
			famousPerson.sayings.pop();

			// close the "write stream"
			stream.close();

			// close "read line"
			rl.close();

		// otherwise, continue asking questions...
		} else {
			rl.setPrompt(`What else would ${famousPerson.name} say? ('exit' to leave) `);
			// console.log(saying.trim());
			rl.prompt();
		}
		
	});
});
// app continues running / "readline" continues listening...
// must press "ctrl" + C to kill the server

rl.on("close", function() {
	// var sayings = famousPerson.sayings;
	// sayings.forEach(saying => {
	// 	console.log(saying);
	// });
	// %s gets replaced by a string (famousPerson.name)
	// %j gets replaced by a JSON string (famousPerson.sayings)
	console.log("%s is a famous person who said: %j", famousPerson.name, famousPerson.sayings);
	process.exit();
});