var expect = require("chai").expect;
var rewire = require("rewire");

// instead of loading the module to test with "require", loading it with "rewire" lets us use mock data (small amount of data = fast test) instead of the real data from inventory.json (big file / large amount of data = long / slow test) 
var order = rewire("../lib/order.js");

describe("Ordering Items", function() {

	beforeEach(function() {
		// define dummy / test data
		// "this" is the Mocha object
		this.testData = [
			{sku: "AAA", qty: 10},
			{sku: "BBB", qty: 0},
			{sku: "CCC", qty: 3}
		];
		// swap the inventoryData variable (which loads data from inventory.json) in order.js with the testData defined above
		order.__set__("inventoryData", this.testData);
	});

	it("order an item when there are enough in stock", function(done) {
		order.orderItem("CCC", 3, function() {
			done();
		});
	});
});