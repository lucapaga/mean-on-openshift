'use strict';

console.log("Configuring $stateProvider for 'lucapaga.conferences'");

//Setting up route
var incluerModule = angular.module('lucapaga.conferences');
console.log("Here's angular module 'lucapaga.conferences' - ", incluerModule);

incluerModule.config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    console.log("Registering fucking provider, state is 'merdone'");

    // states for my app
    $stateProvider
      .state('merdone', {
        url: '/conference',
        templateUrl: 'conference/views/list.html'
      });

    console.log("Registered....?");

      /*
      ,
      resolve: {
        loggedin: checkLoggedin
      }
      */
  }
]);
