app.factory("usersFactory",["$http", function($http){
    var user = {};
    var errors = null;
    var data = null;
    var otherUsers = [];
    function UsersFactory(){
        this.findUser = function(userInfo,callback){
            $http.post("/login",userInfo).then(function(returnedData){
                console.log(returnedData);
                data = user = returnedData.data;
                if(callback && typeof(callback) == "function"){
                    callback(data);
                }
            });
        }
        this.getUser = function(callback){
            callback(user);
        }
        this.create = function(userInfo, callback){
            $http.post("/createUser",userInfo).then(function(returnedData){
                console.log(returnedData.data);
                data = user = returnedData.data;
                if(callback && typeof(callback) == "function"){
                    callback(data);
                }
            });
        }
        this.logout = function(callback){
            user = null;
            if(callback && typeof(callback) == "function"){
                callback();
            }
        }
        this.index = function(callback){
            $http.get("/dashboard").then(function(returnedData){
                console.log(returnedData.data);
                otherUsers = [];
                    for(var u in returnedData.data){
                        if(returnedData.data[u].userName !== user.userName){
                            otherUsers.push(returnedData.data[u]);
                        }
                    }
                    // $http.post("/getOne/"+user._id).then(function(data){
                    //     if(data !== undefined){
                    //         user = data;
                    //     }
                    });
                if(callback && typeof(callback) == "function"){
                    callback(otherUsers);
                }
            });
        }
        this.createBucket = function(bucket,callback){
            $http.post("/createBucket/"+user._id,bucket).then(function(returnedData){
                console.log(returnedData.data);
                if(callback && typeof(callback) == "function"){
                    callback();
                }
            });
        }
        this.getUserById = function(id,callback){
            callback(otherUsers[id]);
        };
    }
    return new UsersFactory();
}]);

console.log("UsersFactory");
