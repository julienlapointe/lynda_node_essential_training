// use "require" to import modules
var path = require("path");

console.log("Hello world!");

// every variable in NodeJS is scoped only to its module / file
var hello = "Hello world from a variable!";
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

// array with 2 strings:
// 1. path to NodeJS
// 2. path to this file
console.log(process.argv);

// returns the value associated with a given flag (parameter) in the command prompt / Terminal (ex. node global.js --user "John" --greeting "Hello!")
function grabArgumentValueGivenFlag(flag) {
	// get index of flag in the process.argv array of strings
	var index = process.argv.indexOf(flag);
	// if flag was not found in, then index === -1 so return null
	return (index === -1) ? null : process.argv[index+1];
}

// get value associated with "--user" flag
var user = grabArgumentValueGivenFlag("--user");
// get value associated with "--greeting" flag
var greeting = grabArgumentValueGivenFlag("--greeting");

// if either flag is missing...
if (!user || !greeting) {
	// output error message
	console.log("Sorry! Incorrect use of flags --user and --greeting");
// otherwise, both flags contain values
} else {
	// output greeting message to user
	console.log(`Welcome ${user}! ${greeting}!`);
}



