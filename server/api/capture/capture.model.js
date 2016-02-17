'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Définition du schema de la ressource
var CaptureSchema = new Schema({
	lat:Number,
	lng:Number,
	temperature:Number,
	humidite:Number,
	son:Number,
	co2:Number,
	ville:String,
	departement:String,
	date:String
});

module.exports = mongoose.model('Capture', CaptureSchema);