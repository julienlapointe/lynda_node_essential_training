// create 2 people from the Person object defined in the custom "Person" module

// can specify NodeJS modules by *name*
// however, must specify custom modules by *path*
// add Person object from the custom "Person" module
const Person = require("./5-lib/PersonModule.js");

// create a new instance of the Person object with name "Steve Jobs"
let steveJobs = new Person("Steve Jobs");
// console.log(steveJobs.name);
let elonMusk = new Person("Elon Musk");

// the Person object can listen to events
steveJobs.on("speak", function(said) {
	// "this" = steveJobs
	console.log(`${this.name}: ${said}`);
});

// the Person object can emit events
steveJobs.emit("speak", "Keep it simple stupid.");

// the Person object can listen to events
elonMusk.on("speak", function(said) {
	// "this" = steveJobs
	console.log(`${this.name} -> ${said}`);
});

// the Person object can emit events
elonMusk.emit("speak", "Let's go to Mars.");