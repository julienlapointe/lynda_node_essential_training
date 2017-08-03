// Mocha = tool for describing, running, and building tests
// Chain = tool for checking values

// add the expect() function from the "chai" module
var expect = require("chai").expect;
// add the custom module that contains the printName() function (the function we are testing)
var tools = require("../lib/tools.js");
// add the "nock" module for creating fake / mock servers for testing HTTP requests... reasons for doing this:
	// 1. speed up test run time
	// 2. HTTP endpoint doesn't exist yet (perhaps it is also under development)
var nock = require("nock");

// note: Mocha has a concept of "hooks" that can be added:
	// 1. before and/or after the "suite" of "Tools" tests
	// 2. before and/or after each test

describe("Tools", function() {
	// describe() is a Mocha function that describes a test
	describe("printName()", function() {
		// each test starts with an "it" function
		// param #1: describes the test
		// param #2: executes the test
		it("should print the last name first", function() {
			// store the actual results from the function being tested
			// the actual results will be compared with our expected results
			var results = tools.printName({ first: "Alex", last: "Banks"});
			// compare the actual results to our expected results
			expect(results).to.equal("Banks, Alex");
		});
	});
	// asynchronous test that loads the Wikipedia Page for Steve Jobs
	describe("loadWiki()", function() {
		// before running this test, create a fake / mock web server using the "nock" module 
		// this speeds up the test because we don't have to wait for Wikipedia to respond (>2s)
		before(function() {
			nock("https://en.wikipedia.org")
				.get("/wiki/Steve_Jobs")
				.reply(200, "Mock Steve Jobs Page");
		});
		// if asynchronous test will take longer than 2s (default max. completion time in Mocha), then use this.timeout(5000) to make Mocha wait 5s (for example) before evaluating the tests
		// "this" represents the Mocha object
		// this.timeout(5000);
		// param: "done" = callback function that tells Mocha that test is not complete until done() gets called 
		it("Load Steve Jobs' Wikipedia page", function(done) {
			tools.loadWiki({ first: "Steve", last: "Jobs"}, function(html) {
				// expect(html).to.be.ok;
				expect(html).to.equal("Mock Steve Jobs Page");
				// we have received a response from Wikipedia so we can now call the done() function to tell Mocha to evaluate this test
				done();
			});

		});

	});
});