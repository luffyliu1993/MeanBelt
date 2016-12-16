//need you own model name

var users = require("../controllers/users.js");
var buckets = require("../controllers/buckets.js");

//create your own method here
module.exports = function(app){
    //put other methods here
    app.post("/login", users.findUser);
    app.post("/createUser", users.create);
    app.get("/dashboard", users.index);
    app.post("/createBucket/:id",buckets.create);
    app.post("/getOne/:id", buckets.getOne);
}

console.log("server-site routes");
