'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Conference Schema
 */
var SpeechSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  }
  , title: {
    type: String,
    required: true,
    trim: true
  }
  , abstract: {
    type: String,
    required: true,
    trim: true
  }
  , transcript: {
    type: String,
    required: false,
    trim: true
  }
  , user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
  , starts: {
    type: Date,
    default: Date.now
  }
  , ends: {
    type: Date,
    default: Date.now
  }
  , speaker: {
    type: Schema.ObjectId,
    ref: 'User'
  }
  , conference: {
    type: Schema.ObjectId,
    ref: 'Conference'
  }
});

/**
 * Validations
 */
SpeechSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

SpeechSchema.path('abstract').validate(function(content) {
  return !!content;
}, 'Abstarct cannot be blank');

// TODO: coerenza tra date!

/**
 * Statics
 */
 /* -- unable to understand meaning */
 /* it is needed (mandated) by mongoose */
SpeechSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
  // .populate('user', 'name username')
};
/* */

mongoose.model('Speech', SpeechSchema);
