'use strict';
//MODEL
var Capture = require('./capture.model');
var Ville = require('../ville/ville.model');
var Departement = require('../departement/departement.model');


//Open Street MAp
var geocoderProvider = 'openstreetmap';

var httpAdapter = 'http';
// optionnal 
var extra = {
    language:"fr" 
};
 
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter,extra);


/*******************************************************************************************
								~	FONCTIONS	~
*******************************************************************************************/

var validationError = function(res, err) {
  return res.json(422, err);
};

//Récupère toutes les captures
exports.getAll = function(req,res,next){
	Capture.find().exec(function(err,captures){
		if(err)
			return res.send(404,err);
		else
			res.json(captures);
	});
};

//Récupère les captures correspondant à la recherche effectuée
exports.search = function(req,res,next){
	//Récupération des critères de recherche
	var critere = req.query;
	var capteur_lng = critere.lng;
	var capteur_lat = critere.lat;
	var capteur_ville = "";
	var capteur_departement = "";
	var capteur_region = "";

	//On incrémente lng et lat afin de déterminer si les données sont bien des number
	capteur_lng++;
	capteur_lat++;

	if(critere.lng!==undefined || critere.lat!==undefined){
		if(capteur_lng !== NaN && critere.lng!==undefined)
			capteur_lng = critere.lng;
		else
			capteur_lng = "";
		if(capteur_lat !== NaN && critere.lat!==undefined)
			capteur_lat = critere.lat;
		else
			capteur_lat = "";
		Capture.find({lng:capteur_lng,lat:capteur_lat}).exec(function(err,captures){
			if(err)
				return res.send(404,err);
			else
				return res.json(captures);
		});
	}
	else if(typeof critere.ville === "string" && critere.ville!==undefined){
		Capture.find({ville:critere.ville}).exec(function(err,captures){
			if(err)
				return res.send(404,err);
			else
				return res.json(captures);
		});
	}
	else if(typeof critere.departement === "string" && critere.departement!==undefined){
		Capture.find({departement:critere.departement}).exec(function(err,captures){
			if(err)
				return res.send(404,err);
			else
				return res.json(captures);
		});
	}
	else{
		return res.send(404,"Critère de recherche incorrectes");
	}
};

//Enregistrement d'une capture
exports.create = function(req,res,next){
	//Récupération des données envoyés par l'application
	var critere = req.body;
	var capteur_lng = critere.lng;
	var capteur_lat = critere.lat;
	var capteur_temperature = critere.temperature;
	var capteur_humidite = critere.humidite;
	var capteur_son = critere.son;
	var capteur_co2 = critere.co2;

	//On incrémente toutes les données afin de déterminer s'ils sont bien des number
	capteur_lng++;
	capteur_lat++;
	capteur_temperature++;
	capteur_humidite++;
	capteur_son++;
	capteur_co2++;

	//Création de la nouvelle capture
	var capture = new Capture();

	if(capteur_lng !== NaN)
		capture.lng = critere.lng;
	else
		capteur_lng = null;
	if(capteur_lat !== NaN)
		capture.lat = critere.lat;
	else
		capteur_lat = null;
	if(capteur_temperature !== NaN)
		capture.temperature = critere.temperature;
	else
		capteur_temperature = null;
	if(capteur_humidite !== NaN)
		capture.humidite = critere.humidite;
	else
		capteur_humidite = null;
	if(capteur_son !== NaN)
		capture.son = critere.son;
	else
	capture.departement = res.state;
		capteur_son = null;
	if(capteur_co2 !== NaN)
		capture.co2 = critere.co2;
	else
		capteur_co2 = null;

	if(capture.lng !== undefined || capture.lat !== undefined || capture.temperature !== undefined || capture.humidite !== undefined || capture.son !== undefined || capture.co2 !== undefined){

		geocoder.reverse({lat:capture.lat, lon:capture.lng})
		    .then(function(localisation) {
		        console.log(localisation);
		        capture.ville = localisation[0].city;

		        Ville.find({nom:localisation[0].city}).exec(function(err,villes){
		        	Departement.find({code:villes[0].departement}).exec(function(err,departements){
		        		capture.departement = departements[0].nom;
		        		capture.save(function(err,captures){
							if(err)
								return res.send(404,err);
							else
								return res.json(captures);
						});
		        	});
		        });
		    })
		    .catch(function(err) {
		        console.log(err);
		    });
	}
	else{
		return res.send(404,'Données incorrectes');
	}
};