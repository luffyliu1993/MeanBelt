var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var root = __dirname;
var app = express();

app.use(express.static(path.join(root,"client")));
app.use(express.static(path.join(root, "bower_components")));
app.use(bodyParser.json());

require("./server/config/mongoose.js");
var routeSetter = require("./server/config/routes.js");
routeSetter(app);

app.listen(8000, function(){
    console.log("Listening to port 8000");
});
