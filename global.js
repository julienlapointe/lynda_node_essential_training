// "Section 3: Node Core"

// use "require" to import modules
const path = require("path");

console.log("----------------");
console.log("Global Objects in NodeJS (ex. console.log, __filename");
console.log("----------------");

console.log("Hello world!");

// every variable in NodeJS is scoped only to its module / file
let hello = "Hello world from a variable!";
// the line below does *not* work because "hello" is a local var to this module (*not* available globally)
// console.log(global.hello);
// but this works!
console.log(hello);

// global constant to directory path
console.log(__dirname);
// global constant to directory path with current filename
console.log(__filename);

// can use ES2015 syntax
console.log(`Hello world from ${path.basename(__filename)}!`);

console.log("----------------");
console.log("Using process.argv to get values from command line");
console.log("----------------");

// array with 2 strings:
// 1. path to NodeJS
// 2. path to this file
console.log(process.argv);

// returns the value associated with a given flag (parameter) in the command prompt / Terminal (ex. node global.js --user "John" --greeting "Hello!")
function grabArgumentValueGivenFlag(flag) {
	// get index of flag in the process.argv array of strings
	let index = process.argv.indexOf(flag);
	// if flag was not found in, then index === -1 so return null
	return (index === -1) ? null : process.argv[index+1];
}

// get value associated with "--user" flag
let user = grabArgumentValueGivenFlag("--user");
// get value associated with "--greeting" flag
let greeting = grabArgumentValueGivenFlag("--greeting");

// if either flag is missing...
if (!user || !greeting) {
	// output error message
	console.log("Sorry! Incorrect use of flags --user and --greeting");
// otherwise, both flags contain values
} else {
	// output greeting message to user
	console.log(`Welcome ${user}! ${greeting}!`);
}

console.log("----------------");
console.log("stdout and stdin");
console.log("----------------");

// initiliaze array of questions
const questions = [
	"What is your name?",
	"What is your favorite color?",
	"What is your passion?"
];

// initialize array to store answers
let answers = [];

// display the question and a "user input promt" where the user can answer
function askQuestionNumber(n) {
	// display question
	process.stdout.write(`\n ${questions[n]} \n`);
	// display input prompt
	process.stdout.write(" > ");
}

askQuestionNumber(0);

// the "data" event occurs when user (me) types text into Terminal / command prompt and presses enter
// uses NodeJS asynchronously to repeat what you said
process.stdin.on("data", function(data) {
	// take data from user and output it to command prompt
	// process.stdout.write(data.toString().trim() + "\n");
	// add answer to "answers" array
	answers.push(data.toString().trim());
	// if there are still questions left to answer...
	if (answers.length < questions.length) {
		// ask the next question
		askQuestionNumber(answers.length);
	// otherwise, all questions have been asked...
	} else {
		// exit application and return to Terminal command prompt
		process.exit();
	}
});

// when the above process "exits", display the user's answers back to the user
process.on("exit", () => {
	process.stdout.write("\n");
	process.stdout.write(`${answers[0]}, ${answers[1]}, ${answers[2]}`);
	process.stdout.write("\n");
});

console.log("\n----------------");
console.log("Timing Functions");
console.log("----------------");

const waitTime = 3000;
let currentTime = 0;
const waitInterval = 500;
let percentWaited;

console.log("Wait for it...");

function writeWaitingPercent(p){
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(`Waiting... ${p}%`);
}

let interval = setInterval(function(){
	currentTime += waitInterval;
	percentWaited = Math.floor((currentTime/waitTime) * 100);
	writeWaitingPercent(percentWaited);
	// console.log(`I've been waiting ${currentTime/1000} seconds...`);
}, waitInterval);

setTimeout(() => {
	clearInterval(interval);
	writeWaitingPercent(100);
	console.log("\nDone!");
	process.exit();
}, waitTime);

// process.stdout.write("\n");
// writeWaitingPercent(percentWaited);

// Section 4: Node Modules

console.log("\n----------------");
console.log("Require");
console.log("----------------");

// see "const path = require('path');" at top
// the "path" module can be used to get the path to the current working directory (cwd) and current filename
// the "path" module can also be used to assemble strings together to form a path
// utilities module
const util = require("util");
const v8 = require("v8");

// path to "uploads" folder
let dirUploads = path.join(__dirname, "www", "files", "uploads");
util.log(dirUploads);
util.log(v8.getHeapStatistics());

// the "readline" module is a wrapper for the stdin and stdout objects that allows us to ask the user questions via the Terminal / command prompt
const readline = require("readline");















