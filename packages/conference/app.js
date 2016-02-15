'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var ConferenceMeanModule = new Module('conference');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
ConferenceMeanModule.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  ConferenceMeanModule.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  ConferenceMeanModule.menus.add({
    'roles': ['authenticated'],
    'title': 'Conferenze',
    'link': 'merdone'
  });
  /*
  Conference.menus.add({
    'roles': ['admin'],
    'title': 'Calendario',
    'link': 'new conf speech'
  });
  */

  //Conference.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Conference.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Conference.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Conference.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Conference.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  ConferenceMeanModule.aggregateAsset('css', 'conferences.css');

  return ConferenceMeanModule;
});
