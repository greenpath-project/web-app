/**
 * Main application routes
 */

'use strict';
var bodyParser = require('body-parser');

module.exports = function(app) {

//Permet d'envoyer et de récupérer des objet JSON du client vers le serveur
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

   // Route à utiliser pour manipuler la ressource Capture
  app.use('/api/captures', require('./api/capture'));
  app.use('/api/villes', require('./api/ville'));
  app.use('/api/departements', require('./api/departement'));
  
  app.route('/:url(api|components|app|bower_components|assets)/*');;
};