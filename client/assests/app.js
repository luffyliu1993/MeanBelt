var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider){
    //provide your angular routes below
    $routeProvider
        .when("/dashboard",{
            //templateUrl here
            templateUrl: "partials/dashboard.html",
            //controller here
            controller: "userController"
        })
        .when("/",{
            templateUrl: "partials/login.html",
            controller: "userController"
        })
        .when("/user/:id",{
            templateUrl: "partials/user.html",
            controller: "userController"
        })
        .otherwise({
            redirectTo: "/"
        });
});
