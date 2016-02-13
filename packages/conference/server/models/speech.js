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
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  abstract: {
    type: String,
    required: true,
    trim: true
  },
  transcript: {
    type: String,
    required: false,
    trim: true
  },
  user: {
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
 /* -- unable to understand meaning
ConferenceSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};
*/

mongoose.model('Speech', SpeechSchema);
