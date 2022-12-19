var fs = require("fs")
console.log("started");

var config = JSON.parse(fs.readFileSync("./config.json"));
console.log("Initial Config :", config);

fs.watchFile("./config.json", function(current, previous){
    console.log("config changed");
    config = JSON.parse(fs.readFileSync("./config.json"));
    console.log("new config file :", config);
});