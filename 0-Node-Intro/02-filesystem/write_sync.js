// var fs = require("fs");
// console.log("Starting");

// fs.writeFileSync("./write_sync.txt", "Helllo World! Synchronous");
// console.log("finished");


// Asyncronously
var fs = require("fs");
console.log("Starting");

fs.writeFile("./write_sync.txt", "Helllo World! Synchronous", function(error){
    console.log("written File");
});
console.log("finished");