// array of sayings
var sayings = [
    "You may delay, but time will not.",
    "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    "It takes many good deeds to build a good reputation, and only one bad one to lose it.",
    "Early to bed and early to rise makes a man healthy, wealthy and wise.",
    "By failing to prepare, you are preparing to fail.",
    "An investment in knowledge pays the best interest.",
    "Well done is better than well said."
];

// every second, output a randomly selected saying to the console
var interval = setInterval(function() {
	var i = Math.floor(Math.random() * sayings.length);
	process.stdout.write(`${sayings[i]} \n`);
}, 1000);

// whenever data is received from Terminal user (can be any text input, like "fdfds"), run callback function to clear the interval and exit the process (stops the sayings from being outputted)
process.stdin.on('data', function(data) {
	console.log(`STDIN Data Recieved -> ${data.toString().trim()}`);
	clearInterval(interval);
	process.exit();
});