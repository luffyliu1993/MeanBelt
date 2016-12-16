var mongoose = require("mongoose");
var fs = require("fs");
var path = require("path");

//need to enter your own db name
mongoose.connect("mongodb://localhost/FirstMeanBelt");

var modelsPath = path.join(__dirname, "./../models");

fs.readdirSync(modelsPath).forEach(function(file){
    if(file.indexOf(".js") >= 0){
        require(modelsPath+"/"+file);
    }
});

console.log("Load mongoose.js");
