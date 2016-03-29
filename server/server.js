var express = require('express');
var mongoose = require('mongoose');

var app = express();

//Connexion à la base de donnée
mongoose.connect('mongodb://localhost/GreenPath');

//Gestionnaire des routes côté serveur
require('./routes')(app);

app.use(express.static(__dirname + '/../public'));

app.listen(8080, function () {
  console.log('Start');
});

exports = module.exports = app;