'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Définition du schema de la ressource
var DepartementSchema = new Schema({
	code : Number,
	nom : String
});

module.exports = mongoose.model('Departement', DepartementSchema);