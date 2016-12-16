app.controller("userController",["$scope", "usersFactory","$location","$routeParams", function($scope, usersFactory,$location,$routeParams){
    $scope.registerUser = {};
    $scope.loginUser = {};
    $scope.userData = {};
    $scope.otherUsers = {};
    function getData(data){
        console.log(data);
        if(data.errors){
            $scope.errors = data.errors;
        }
        else{
            $scope.userData = data;
            $location.url("/dashboard")
        }
    }
    $scope.findUser = function(){
        usersFactory.findUser($scope.loginUser,getData);
        $scope.loginUser = {};
    };
    $scope.create = function(){
        usersFactory.create($scope.registerUser,getData);
        $scope.registerUser = {};
    };
    $scope.logout = function(){
        $scope.userData = null;
        usersFactory.logout(function(){
            $location.url("/");
        });
    };
    function getSpecificUser(){
        usersFactory.getUserById($routeParams.id, function(data){
            $scope.specificUser = data;
        });
    }
    function index(){
        usersFactory.index(function(data){
            $scope.otherUsers = data;
        });
        usersFactory.getUser(function(data){
            $scope.userData = data;
        });
    };
    $scope.home = function(){
        $location.url("/dashboard");
    };
    $scope.createBucket = function(){
        usersFactory.createBucket($scope.bucket,index);
        $scope.bucket = {};
    };
    index();
    getSpecificUser();
}]);
