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
  Conferences.load(id, function(err, conference) {
    if (err) return next(err);
    if (!conference) return next(new Error('Failed to load conference for ID ' + id));
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
  Conferences.find()
             .sort('-starts')
             .exec(function(err, confz) {
               var returnObj = {};
               if(err) {
                 returnObj = {
                   exitCode: "ERROR",
                   error: err
                 };
               } else {
                 returnObj = {
                   exitCode: "SUCCESS",
                   confListSize: confz.length,
                   confList: confz
                 };
               }
               res.json(returnObj);
             });
};
console.log("Created 'listAll' handler: ", exports.listAll);

/**
 * Crea una nuova Conferenza
 */
exports.createConf = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};
console.log("Created 'createConf' handler: ", exports.createConf);

/**
 * Carica i dettagli di una conferenza
 */
exports.show = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
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
  res.json(500, {exitCode: "UNINMPLEMENTED"});
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