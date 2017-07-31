// add the NodeJS "events" modules
var events = require("events");

// EventEmitter is a constructor
// create a new instance of EventEmitter
// emitter now has 2 methods:
	// 1. emitter.on()
	// 2. emitter.emit()
var emitter = new events.EventEmitter();

// listens for "customEvent"
// when "customEvent" occurs, the "status" and "message" variables are delivered into the callback function's parameters 
// param #1: custom event name to listen for
// param #2: callback function with the event's payload as parameters
emitter.on("customEvent", function(status, message) {
	console.log(`${status}: ${message}`)
});

// param #1: custom event name to emit
// * param #N: * variable(s) to be sent as payload (passed into callback function as parameters)
emitter.emit("customEvent", 200, "Hello World!")