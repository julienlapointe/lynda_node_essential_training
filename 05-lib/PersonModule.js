// Person object from 4-eventEmitter.js placed in a separate module
// putting the code in a separate file makes it easier to re-use

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

// "module.exports" is like any JS object
// "module.exports" is the object returned by the "require" function!!!
module.exports = Person;