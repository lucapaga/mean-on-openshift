'use strict';

//Articles service used for articles REST endpoint
angular.module('lucapaga.conferences').factory('ConferencesSRV', ['$resource',
  function($resource) {
    return $resource('articles/:articleId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
