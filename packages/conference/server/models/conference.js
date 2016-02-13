'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Conference Schema
 */
var ConferenceSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  }
  , title: {
    type: String,
    required: true,
    trim: true
  }
  , description: {
    type: String,
    required: true,
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
});

/**
 * Validations
 */
ConferenceSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

ConferenceSchema.path('description').validate(function(content) {
  return !!content;
}, 'Description cannot be blank');

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

mongoose.model('Conference', ConferenceSchema);
