'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Speeches = mongoose.model('Speech'),
  Conferences = mongoose.model('Conference'),
  _ = require('lodash');

console.log("Loaded 'Speech' MongoDB model: ", Speeches);
console.log("Loaded 'Conference' MongoDB model: ", Conferences);

/**
 * Find speech by id
 * (binding dell'app.param su routes/conference.js)
 */
exports.conference = function(req, res, next, id) {
  console.log("Loading conference for id: ", id);
  Conferences.load(id, function(err, conference) {
    if (err) return next(err);
    if (!conference) return next(new Error('Failed to load conference for ID ' + id));
    console.log("Conference found!");
    req.conference = conference;
    next();
  });
};
console.log("Created 'conference' handler: ", exports.conference);

/**
 * Find conference by id
 * (binding dell'app.param su routes/conference.js)
 */
exports.speech = function(req, res, next, id) {
  Speeches.load(id, function(err, speech) {
    if (err) return next(err);
    if (!speech) return next(new Error('Failed to load speech for ID ' + id));
    req.speech = speech;
    next();
  });
};
console.log("Created 'speech' handler: ", exports.speech);

/**
 * Sets User's ID
 * (binding dell'app.param su routes/conference.js)
 */
exports.user = function(req, res, next, id) {
  req.userReference = id;
  next();
};
console.log("Created 'user' handler: ", exports.user);

/**
 * Elenca tutte le Conferenze
 */
exports.listAll = function(req, res) {
  console.log("Executing 'listAll' REST handler");
  Conferences.find()
             .sort('-starts')
             .exec(function(err, confz) {
               var returnObj = {};
               if(err) {
                 console.log("Ouch, error occurred - ", err);
                 returnObj = {
                   exitCode: "ERROR",
                   error: err
                 };
               } else {
                 console.log("Great, load ended well - " + confz.length + " record(s) found");
                 returnObj = {
                   exitCode: "SUCCESS",
                   confListSize: confz.length,
                   confList: confz
                 };
               }

               console.log("Returning result");
               res.json(returnObj);
             });
};
console.log("Created 'listAll' handler: ", exports.listAll);

/**
 * Crea una nuova Conferenza
 */
exports.createConf = function(req, res) {
  var newConf = new Conferences(req.body);
  newConf.user = req.user;
  console.log("Going to create new Conference: ", newConf);
  newConf.save(function(err) {
    if (err) {
      console.log("Arrgh, something is not good! ", err);
      return res.status(500).json({
        exitCode: "FAILED",
        error: err
      });
    }
    console.log("Ok, we've done it, returning!");
    res.json(newConf);
  });
  // res.json(500, {exitCode: "UNINMPLEMENTED"});
};
console.log("Created 'createConf' handler: ", exports.createConf);

/**
 * Carica i dettagli di una conferenza
 */
exports.show = function(req, res) {
  console.log("Returning loaded conf");
  var loadedConference = req.conference;
  res.json(loadedConference);
  //res.json(500, {exitCode: "UNINMPLEMENTED"});
};
console.log("Created 'show' handler: ", exports.show);

/**
 * Modifica una Conferenza
 */
exports.updateConf = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};
console.log("Created 'updateConf' handler: ", exports.updateConf);

/**
 * Elenca tutti gli Speech in una Conferenza
 */
exports.schedule = function(req, res) {
  var refConference = req.conference;
  console.log("Loading schedule for conference id ", refConference._id);
  var sQuery = Speeches.where({conference: refConference});
  sQuery.sort('-starts')
             .exec(function(err, confz) {
               var returnObj = {};
               if(err) {
                 console.log("Ouch, error occurred - ", err);
                 returnObj = {
                   exitCode: "ERROR",
                   error: err
                 };
               } else {
                 console.log("Great, load ended well - " + confz.length + " record(s) found");
                 returnObj = {
                   exitCode: "SUCCESS",
                   speechListSize: confz.length,
                   speechList: confz
                 };
               }

               console.log("Returning result");
               res.json(returnObj);
             });

};
console.log("Created 'schedule' handler: ", exports.schedule);

/**
 * Crea un nuovo Speech nell'ambito di una Conferenza
 */
exports.createSpeech = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};
console.log("Created 'createSpeech' handler: ", exports.createSpeech);

/**
 * Carica i dettagli di uno Speech (di una Conferenza)
 */
exports.showSpeech = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};
console.log("Created 'showSpeech' handler: ", exports.showSpeech);

/**
 * Modificare i dettagli di uno Speech (di una Conferenza)
 */
exports.updateSpeech = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};
console.log("Created 'updateSpeech' handler: ", exports.updateSpeech);

/**
 * Effettua l'enrollment dell'utente loggato su uno speech di una conferenza
 */
exports.enrollSpeech = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};
console.log("Created 'enrollSpeech' handler: ", exports.enrollSpeech);

/**
 * Effettua l'enrollment di un utente qualsiasi su uno speech di una conferenza
 */
exports.enrollUserInSpeech = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};
console.log("Created 'enrollUserInSpeech' handler: ", exports.enrollUserInSpeech);
