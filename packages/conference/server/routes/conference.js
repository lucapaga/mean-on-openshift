'use strict';

var conferenceSrvCtrl = require('../controllers/conference');

console.log("What is 'conference'? >" + conferenceSrvCtrl + "< -- ", conferenceSrvCtrl);

// Conference authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin) { // && req.conference.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(ConferenceMeanModule, app, auth) {
  console.log("Conference is ", conferenceSrvCtrl);
  console.log("conference.listAll is ", conferenceSrvCtrl.listAll);
  app.route('/conf/conference')
    .get(conferenceSrvCtrl.listAll)
    .post(auth.requiresLogin, hasAuthorization, conferenceSrvCtrl.createConf);

  app.route('/conf/conference/:confId')
    .get(conferenceSrvCtrl.show)
    .post(auth.requiresLogin, hasAuthorization, conferenceSrvCtrl.updateConf);

  app.route('/conf/conference/:confId/speech')
    .get(conferenceSrvCtrl.schedule)
    .post(auth.requiresLogin, hasAuthorization, conferenceSrvCtrl.createSpeech);

  app.route('/conf/conference/:confId/speech/:speechId')
    .get(conferenceSrvCtrl.showSpeech)
    .post(auth.requiresLogin, hasAuthorization, conferenceSrvCtrl.updateSpeech);

  app.route('/conf/conference/:confId/speech/:speechId/enroll')
    .post(auth.requiresLogin, conferenceSrvCtrl.enrollSpeech);

  app.route('/conf/conference/:confId/speech/:speechId/enroll/:userId')
    .post(auth.requiresLogin, hasAuthorization, conferenceSrvCtrl.enrollUserInSpeech);

  app.param('confId', conferenceSrvCtrl.conference);
  app.param('speechId', conferenceSrvCtrl.speech);
  app.param('userId', conferenceSrvCtrl.user);

  /*
  app.route('/articles/:articleId')
    .get(articles.show)
    .put(auth.requiresLogin, hasAuthorization, articles.update)
    .delete(auth.requiresLogin, hasAuthorization, articles.destroy);

  // Finish with setting up the articleId param
  app.param('articleId', articles.article);
  */
};
