'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.conference').factory('ConferencesSRV', ['$resource',
  function($resource) {
    return $resource('/conf/conference/:confId', {
      confId: '@_id'
    }, {
      update: {
        method: 'POST'
      }
    });
  }
]);
