var mongoose = require("mongoose");

var Bucket = mongoose.model("Bucket");
var User = mongoose.model("User");

function BucketsController(){
    this.getOne = function(req, res){
        Bucket.findOne({_user: req.params.id}, function(err, data){
            if(err){
                res.json(err);
            }
            else{
                res.json(data);
            }
        });
    };
    this.create = function(req, res){
        User.findOne({_id: req.params.id}, function(err, user){
            var bucket = new Bucket();
            bucket.title = req.body.title;
            bucket.desc = req.body.desc;
            bucket._user = user._id;
            bucket.save(function(err){
                if(err){
                    console.log(err);
                    return res.json(err);
                }
                user.buckets.push(bucket);
                user.save(function(err,data){
                    if(err){
                        console.log(err);
                        return res.json(err);
                    }
                });
                if(req.body.taggedUser !== undefined && req.body.taggedUser !== "Select"){
                    User.findOne({userName: req.body.taggedUser.userName},function(err, data){
                        if(err){
                            console.log(err);
                            res.json(err);
                        }
                        else{
                            data.buckets.push(bucket);
                            data.save(function(err,data){
                                if(err){
                                    console.log(err);
                                    return res.json(err);
                                }
                            });
                            res.json(data);
                        }
                    });
                }
            });

        });
    }
}

module.exports = new BucketsController();
console.log("controllers/BucketsController");
