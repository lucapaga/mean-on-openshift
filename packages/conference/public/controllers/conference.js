'use strict';

console.log("Registering controller(s) for 'mean.conference'");

angular.module('mean.conference')
  .controller('ConferencesController',
              ['$scope', '$stateParams', '$location', '$http', 'Global', /*'ConferencesSRV',*/
  function($scope, $stateParams, $location, $http, Global/*, Conferences*/) {
    $scope.global = Global;

    $scope.hasAuthorization = function(article) {
      return $scope.global.isAdmin;
    };

    $scope.loadAllConfz = function() {
      $scope.conferences = [];
      console.log("Retrieving all confz ...");
      $http.get('/conf/conference')
        .success(function(resPayload){
          console.log("here's what I got", resPayload);
          if(resPayload.exitCode === "UNAUTHORIZED") {
            console.log("Arr... It seems U R not authorized!");
          } else if(resPayload.exitCode === "ERROR") {
            console.log("Arr... got an error", resPayload.error);
          } else {
            console.log("All's well that ends well!");
            console.log("Got " + resPayload.confListSize + " conferences");
            $scope.conferences = resPayload.confList;
          }
        })
        .error(function (error) {
          console.log("Ooops, got an error!", error);
        });
    };

    $scope.prepareEmptyConf = function() {
        $scope.newConf = {
          title: "",
          description: ""
        };
        $scope.confCreationSucceeded = false;
        $scope.confCreationFailed = false;
        $scope.confCreationFailure = {
          title: "ERRORE GENERICO",
          description: ""
        };
    }

    $scope.createNewConference = function(confToSave) {
      if(!confToSave) {
        console.log("confToSave is null, using $scope.newConf");
        confToSave = $scope.newConf;
      }

      $http({
        method: "POST",
        url: "/conf/conference",
        data: confToSave
      }).then(function(response){
        // on ok
        console.log("Call was OK", response);
        $scope.confCreationSucceeded = true;
        $scope.confCreationFailed = false;
      }, function(response){
        // on error
        console.log("Call was KO", response);
        $scope.confCreationSucceeded = false;
        $scope.confCreationFailed = true;
        $scope.confCreationFailure = {
          title: "ERRORE GENERICO",
          description: response.data.error
        };
      });
    }

    /*
    $scope.create = function(isValid) {
      if (isValid) {
        var article = new Articles({
          title: this.title,
          content: this.content
        });
        article.$save(function(response) {
          $location.path('articles/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.findOne = function() {
      Articles.get({
        articleId: $stateParams.articleId
      }, function(article) {
        $scope.article = article;
      });
    };
    */
  }
]);
