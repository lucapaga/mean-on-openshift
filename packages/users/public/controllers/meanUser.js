'use strict';
angular.module('mean.users')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {
      // This object will be filled by the form
      $scope.user = {};

      // Register the login() function
      $scope.login = function() {
        $http.post('/login', {
          email: $scope.user.email,
          password: $scope.user.password
        })
          .success(function(response) {
            // authentication OK
            $scope.loginError = 0;

            $rootScope.user = response.user;

            // luca.paganelli - flagging user isAdmin()
            $rootScope.user.isAdmin = false;
            console.log("logged user is: ", $rootScope.user);
            console.log("logged user role(s) is/are: " + $rootScope.user.roles);
            $rootScope.user.roles.forEach(function (anUserRole, index, array) {
              if(anUserRole === "admin") {
                $rootScope.user.isAdmin = true;
                console.log("logged user is ADMIN!");
              }
            });

            $rootScope.$emit('loggedin');
            if (response.redirect) {
              if (window.location.href === response.redirect) {
                //This is so an admin user will get full admin page
                window.location.reload();
              } else {
                window.location = response.redirect;
              }
            } else {
              $location.url('/');
            }
          })
          .error(function() {
            $scope.loginerror = 'Authentication failed.';
          });
      };
    }
  ])
  .controller('UsersManagementCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {
      // luca.paganelli - 20160211 - controller per la gestione utenti

      $scope.isAdministrator = function(anUser) {
        if(anUser) {
          if(anUser.roles) {
            console.log("User roles are ", anUser.roles, " looping on them");
            if(anUser.isAdmin) {
              console.log("User 'isAdmin' is TRUE");
              return true;
            } else {
              if(anUser.roles.indexOf('admin') !== -1) {
                console.log("User has 'admin' in his roles");
                return true;
              }else{
                console.log("User is NOT admin");
                return false;
              }
            }
          } else {
            console.log("No roles, no administrator");
            return false;
          }
        } else {
          console.log("input user is null, unable to check");
        }
      }

      $scope.retrieveAll = function() {
        /*
        Articles.query(function(articles) {
          $scope.articles = articles;
        });
        */
        $scope.listOfUsers = [];
        console.log("retrieving all users ...");
        $http.get('/users/all')
          .success(function(resPayload){
            console.log("here's what I got", resPayload);
            if(resPayload.exitCode === "UNAUTHORIZED") {
              console.log("Arr... It seems U R not authorized!");
            }

            $scope.listOfUsers = resPayload.results;
          })
          .error(function (error) {
            console.log("Ooops, got an error!", error);
          });
      };

      $scope.removeUser = function(anUserAccount) {
        console.log("Going to remove user ...");
        // delete user
      };

      $scope.promoteUser = function(anUserAccount) {
        console.log("Elevating user to ADMIN");
        anUserAccount.roles.push("admin");
        // save
      };

      $scope.demoteUser = function(anUserAccount) {
        console.log("Removing ADMIN grants ...");
        var adminPositions = [];
        for (var i = 0; i < anUserAccount.roles.length; i++) {
          if(anUserAccount.roles[i] === "admin") {
            adminPositions.push(i);
          }
        };
        console.log("Found " + adminPositions.length + " occurence/ies of 'admin' role for user");
        adminPositions.forEach(function(item, index){
          adminPositions.splice(item, 1);
        });
        // remove
        // save
      };
    }
  ])
  .controller('RegisterCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {
      $scope.user = {};

      $scope.register = function() {
        $scope.usernameError = null;
        $scope.registerError = null;
        $http.post('/register', {
          email: $scope.user.email,
          password: $scope.user.password,
          confirmPassword: $scope.user.confirmPassword,
          username: $scope.user.username,
          name: $scope.user.name
        })
          .success(function() {
            // authentication OK
            $scope.registerError = 0;
            $rootScope.user = $scope.user;
            $rootScope.$emit('loggedin');
            $location.url('/');
          })
          .error(function(error) {
            // Error: authentication failed
            if (error === 'Username already taken') {
              $scope.usernameError = error;
            } else if (error === 'Email already taken') {
              $scope.emailError = error;
            } else $scope.registerError = error;
          });
      };
    }
  ])
  .controller('ForgotPasswordCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {
      $scope.user = {};
      $scope.forgotpassword = function() {
        $http.post('/forgot-password', {
          text: $scope.text
        })
          .success(function(response) {
            $scope.response = response;
          })
          .error(function(error) {
            $scope.response = error;
          });
      };
    }
  ])
  .controller('ResetPasswordCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams',
    function($scope, $rootScope, $http, $location, $stateParams) {
      $scope.user = {};
      $scope.resetpassword = function() {
        $http.post('/reset/' + $stateParams.tokenId, {
          password: $scope.user.password,
          confirmPassword: $scope.user.confirmPassword
        })
          .success(function(response) {
            $rootScope.user = response.user;
            $rootScope.$emit('loggedin');
            if (response.redirect) {
              if (window.location.href === response.redirect) {
                //This is so an admin user will get full admin page
                window.location.reload();
              } else {
                window.location = response.redirect;
              }
            } else {
              $location.url('/');
            }
          })
          .error(function(error) {
            if (error.msg === 'Token invalid or expired')
              $scope.resetpassworderror = 'Could not update password as token is invalid or may have expired';
            else
              $scope.validationError = error;
          });
      };
    }
  ]);
