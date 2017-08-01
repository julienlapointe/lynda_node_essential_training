// uses the NodeJS 'events' module to create a Person object that inherits the EventEmitter .on() and .emit() methods via the NodeJS 'util' module and its util.inherits() method

// add the NodeJS "events" modules
// pull EventEmitter constructor function out of the NodeJS "events" module and assign it to a local variable
// var "EventEmitter" is a constructor function
const EventEmitter = require("events").EventEmitter;
// add the NodeJS "utilities" modules
const util = require("util");

// create a constructor function for a Person
// NOTE: cannot use arrow functions (=>) as constructor functions
// const Person = (name) => {
const Person = function(name) {
	// set *this* person's name to the "name" paramter passed in
	this.name = name;
}

// Person object to inherit the EventEmitter constructor function / object (because everything in JS in an object)
// .inherits() method allows us to add an object to the prototype of an existing object 
// this means that the Person object has inheritted all the functonality of the EventEmitter object
util.inherits(Person, EventEmitter);

// create a new instance of the Person object with name "Steve Jobs"
let steveJobs = new Person("Steve Jobs");
// console.log(steveJobs.name);

// the Person object can listen to events
steveJobs.on("speak", function(said) {
	// "this" = steveJobs
	console.log(`${this.name}: ${said}`);
});

// the Person object can emit events
steveJobs.emit("speak", "Keep it simple stupid.");