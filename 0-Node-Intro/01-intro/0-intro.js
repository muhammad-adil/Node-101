var fs = require("fs");
console.log("Starting");
fs.readFile("sample.txt", function(error, data) {
	console.log("contents of file: " + data);
});
console.log("carry on executing");