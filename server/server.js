var express = require('express');

var app = express();

//Gestionnaire des routes côté serveur
require('./routes')(app);

app.use(express.static(__dirname + '/../public'));

app.listen(8080, function () {
  console.log('Server has started on port 8080.');
});

exports = module.exports = app;