'use strict';

var conference = require('../controllers/conference');

console.log("What is 'conference'? >" + conference + "< -- ", conference);

// Conference authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin) { // && req.conference.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(conference, app, auth) {
  app.route('/conf/conference')
    .get(conference.listAll);
/*
    .post(auth.requiresLogin, hasAuthorization, conference.createConf);

  app.route('/conf/conference/:confId')
    .get(conference.show)
    .post(auth.requiresLogin, hasAuthorization, conference.updateConf);

  app.route('/conf/conference/:confId/speech')
    .get(conference.schedule)
    .post(auth.requiresLogin, hasAuthorization, conference.createSpeech);

  app.route('/conf/conference/:confId/speech/:speechId')
    .get(conference.showSpeech)
    .post(auth.requiresLogin, hasAuthorization, conference.updateSpeech);

  app.route('/conf/conference/:confId/speech/:speechId/enroll')
    .post(auth.requiresLogin, conference.enrollSpeech);

  app.route('/conf/conference/:confId/speech/:speechId/enroll/:userId')
    .post(auth.requiresLogin, hasAuthorization, conference.enrollUserInSpeech);

  app.param('confId', conference.conference);
  app.param('speechId', conference.speech);
  app.param('userId', conference.user);
*/
  /*
  app.route('/articles/:articleId')
    .get(articles.show)
    .put(auth.requiresLogin, hasAuthorization, articles.update)
    .delete(auth.requiresLogin, hasAuthorization, articles.destroy);

  // Finish with setting up the articleId param
  app.param('articleId', articles.article);
  */
};
