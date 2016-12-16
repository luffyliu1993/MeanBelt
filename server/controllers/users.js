var mongoose = require("mongoose");
//var bcrypt = require("bcrypt");
//remember to change ModelName to the corresponding model name
var User = mongoose.model("User");

//creating a class to hold all the model methods below
function UsersContoller(){
    //methods are here
    this.index = function(req, res){
        User.find({})
        .populate("buckets")
        .exec(function(err, data){
            if(err){
                console.log(err);
                res.json(err);
            }
            else{
                res.json(data);
            }
        });
    };
    this.create = function(req, res){
	    if(req.body.password !== req.body.passwordConfirm){
                return res.json({errors: {password:{message:"Password and confirmed password are not matched"}}});
            }
            var user = new User();
            user.email = req.body.email;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.password = req.body.password;
            user.userName = req.body.userName;
            user.save(function(err, data){
                if(err){
                    console.log(err);
                    res.json(err);
                }
                else{
                    res.json(data);
                }
            });
    };
    this.findUser = function(req, res){
        var errors = null;
        if(req.body.email === undefined){
            errors = {email: {message:"Please enter a valid email"}};
        }
        if(req.body.password === undefined){
            if(!errors)
                errors = {password: {message: "Please enter a password"}};
            else {
                errors.password = {message: "Please enter a password"};
            }
        }
        if(errors){
            return res.json({errors});
        }
        User.findOne({email: req.body.email}, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                if(!data){
                    res.json({errors: {email:{message:"Cannot find the email"}}});
                }
                else{
                    if(req.body.password === data.password){
                        User.findOne({_id: data._id})
                        .populate("buckets")
                        .exec(function(err, data){
                            if(err){
                                return res.json(err);
                            }
                            else{
                                return res.json(data);
                            }
                        });
                    }
                    else{
                        res.json({errors: {password:{message:"Incorrect Password!"}}});
                    }
                }
            }
        });
    };
}

module.exports = new UsersContoller();

console.log("controllers/Users.js");
