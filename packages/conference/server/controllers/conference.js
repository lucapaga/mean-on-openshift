'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Speeches = mongoose.model('Speech'),
  Conferences = mongoose.model('Conference'),
  _ = require('lodash');


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

/**
 * Sets User's ID
 * (binding dell'app.param su routes/conference.js)
 */
exports.user = function(req, res, next, id) {
  req.userReference = id;
  next();
};

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

/**
 * Crea una nuova Conferenza
 */
exports.createConf = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};

/**
 * Carica i dettagli di una conferenza
 */
exports.show = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};

/**
 * Modifica una Conferenza
 */
exports.updateConf = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};

/**
 * Elenca tutti gli Speech in una Conferenza
 */
exports.schedule = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};  

/**
 * Crea un nuovo Speech nell'ambito di una Conferenza
 */
exports.createSpeech = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};

/**
 * Carica i dettagli di uno Speech (di una Conferenza)
 */
exports.showSpeech = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};

/**
 * Modificare i dettagli di uno Speech (di una Conferenza)
 */
exports.updateSpeech = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};

/**
 * Effettua l'enrollment dell'utente loggato su uno speech di una conferenza
 */
exports.enrollSpeech = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};

/**
 * Effettua l'enrollment di un utente qualsiasi su uno speech di una conferenza
 */
exports.enrollUserInSpeech = function(req, res) {
  res.json(500, {exitCode: "UNINMPLEMENTED"});
};
