'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Définition du schema de la ressource
var VilleSchema = new Schema({
	nom: String,
	code: String,
	departement: String
});

module.exports = mongoose.model('Ville', VilleSchema);