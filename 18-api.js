// this file creates an API server that responds to client requests with JSON data

// add the NodeJS "HTTPS" module
const http = require("http");
// *** add JSON data to serve ***
const data = require("./data/inventory.json");

// create the HTTP server *chained* with the "listen" function (no need to create an instance of the server called "server" as in 16-server.js)
http.createServer(function(req, res) {
	// if user / client requests the root path / route, then...
	if (req.url === "/") {
		// respond with all items
		res.writeHead(200, {"Content-Type": "text/json"});
		console.log(data);
		console.log(JSON.stringify(data));
	    res.end(JSON.stringify(data));
	// if user / client requests the "/instock" path / route, then...
	} else if (req.url === "/instock") {
		// respond with only the "in stock" items
		listInStock(res);
	// if user / client requests the "/backorder" path / route, then...
	} else if (req.url === "/backorder") {
		// respond with only the "on back order" items
		listOnBackOrder(res);
	// otherwise, user / client is requesting an invalid path / route
	} else {
		// write header
		res.writeHead(404, {"Content-Type": "text/plain"});
		// respond with error message to user / client
		res.end("Whoops... Data not found.");
	}
}).listen(3000);

console.log("File server is running on port 3000...");

// filter the "data" array to produce a new array containing only items that are "in stock"
function listInStock(res) {
	// the .filter() function is called a "predicate" (it returns either TRUE or FALSE for each item)
	let inStock = data.filter(function(item) {
		// if *this* item.avail === "In stock", then add it to the inStock array (otherwise, ignore the item)
		return item.avail === "In stock";
	});
	// respond to user / client's request with this filtered list of items
	res.end(JSON.stringify(inStock));
}

// filter the "data" array to produce a new array containing only items that are "on back order"
function listOnBackOrder(res) {
	let onOrder = data.filter(function(item) {
		return item.avail === "On back order";
	});
	res.end(JSON.stringify(onOrder));
}