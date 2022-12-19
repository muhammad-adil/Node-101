var fs = ("fs");
console.log("Starting");

var content = fs.readFileSync("./sample.txt") // we wait until we read this file
console.log("contents: " + content);
console.log("Carry on Executing");