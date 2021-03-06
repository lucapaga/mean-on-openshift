'use strict';

console.log("Registering controller(s) for 'mean.conference'");

angular.module('mean.conference')
  .controller('ConferencesController',
              ['$scope', '$stateParams', '$location', '$http', 'Global', 'ConferencesSRV',
  function($scope, $stateParams, $location, $http, Global, Conferences) {
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
    };


    $scope.loadConfDetails = function() {
      console.log("Running 'loadConfDetails' ... ");
      //console.log("Here's the '$location': ", $location);
      //console.log("Here's the '$stateParams': ", $stateParams);
      console.log("Processing conference with id ", $stateParams.conference_id);

      console.log("Resetting Schedule");
      $scope.scheduleLoaded=false;
      $scope.confSchedule=[];
      $scope.showNewScheduleItemPane = false;

      var apiURL =  "/conf/conference/" + $stateParams.conference_id;
      console.log("Calling API at ", apiURL);
      $http({
        method: "GET",
        url: apiURL
      }).then(function(response){
        // on ok
        console.log("Call was OK", response);
        $scope.thatConference = response.data;
        $scope.loadAgenda();
      }, function(response){
        // on error
        console.log("Call was KO", response);
        $scope.thatConference = {};
      });
    };

    $scope.loadAgenda = function() {
      var apiURL =  "/conf/conference/" + $stateParams.conference_id + "/speech";
      $http({
        method: "GET",
        url: apiURL
      }).then(function(response){
        // on ok
        console.log("Call was OK", response);
        $scope.confSchedule = response.data.speechList;
        $scope.scheduleLoaded=true;
      }, function(response){
        // on error
        console.log("Call was KO", response);
        $scope.scheduleLoaded=true;
        $scope.confSchedule=[];
      });
    };

    $scope.createNewSpeech = function() {
      $scope.newScheduleItem = {
        title: "",
        abstract: "",
        starts: null,
        ends: null
      };
      $scope.showNewScheduleItemPane = true;
    };

    $scope.saveNewSpeech = function() {
      // interazione con REST
      console.log("List is ", $scope.confSchedule);
      if($scope.confSchedule === null) {
        console.log("Creating 'confSchedule' list");
        $scope.confSchedule = [];
      };

      var newC = {
        title: $scope.newScheduleItem.title,
        abstract: $scope.newScheduleItem.abstract
      };

      var apiURL =  "/conf/conference/" + $stateParams.conference_id + "/speech";
      $http({
        method: "POST",
        url: apiURL,
        data: newC
      }).then(function(response){
        // on ok
        console.log("Call was OK", response);
        $scope.showNewScheduleItemPane = false;
        $scope.loadAgenda();
      }, function(response){
        // on error
        console.log("Call was KO", response);
      });

      /*
      console.log("Pusinhg into list this: ", newC);
      $scope.confSchedule.push(newC);
      console.log("List is ", $scope.confSchedule);
      $scope.createNewSpeech();
      */
    };

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
