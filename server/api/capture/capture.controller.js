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
    console.log(JSON.stringify(req.query));
	var critere = req.query;
	var capteur_dateDeb = critere.dateDeb;
	var capteur_dateFin = critere.dateFin;
	var capteur_ville = critere.ville;
	var capteur_departement = critere.departement;
    var capteur_skip = parseInt(critere.skip);
    var capteur_limit = parseInt(critere.limit);

	//Recherche
	if(capteur_dateDeb=="" && capteur_dateFin==""){
		console.log('Recherche sans date !');
		var nbCaptures = 0;
		if(capteur_ville!==""){
			Capture.find({ville:capteur_ville}).exec(function(err,captures){
				if(err)
					return res.send(404,err);
				else
					nbCaptures = captures.length;
					Capture.find({ville:capteur_ville}).skip(capteur_skip).limit(capteur_limit).exec(function(err,captures){
						if(err)
							return res.send(404,err);
						else
							return res.json({
								nbCaptures : nbCaptures,
								captures : captures
							});
					});
			});
		}
		else if(capteur_departement!==""){
			Capture.find({departement:capteur_departement}).exec(function(err,captures){
				if(err)
					return res.send(404,err);
				else
					nbCaptures = captures.length;
					Capture.find({ville:capteur_ville}).skip(capteur_skip).limit(capteur_limit).exec(function(err,captures){
					if(err)
						return res.send(404,err);
					else
						return res.json({
							nbCaptures : nbCaptures,
							captures : captures
						});
				});
			});
		}
		else{
			return res.send(404,'Données incorrectes');
		}
	}
	else{

		capteur_dateDeb = new Date(capteur_dateDeb);
		capteur_dateFin = new Date(capteur_dateFin);
		console.log('Recherche avec date !' + capteur_dateDeb + ' - ' +  capteur_dateFin);

		if(capteur_ville!==""){
			console.log('Recherche ville !');
            var nbCaptures = 0;
            Capture.find({ville:capteur_ville,date:{$gte:capteur_dateDeb,$lte:capteur_dateFin}}).exec(function(err,captures){
				console.log(capteur_skip + ' - ' + capteur_limit);
                if(err){
                    return res.send(404,err);
                }else{
                    nbCaptures = captures.length;
                    Capture.find({ville:capteur_ville,date:{$gte:capteur_dateDeb,$lte:capteur_dateFin}}).skip(capteur_skip).limit(capteur_limit).exec(function(err,captures){
                        if(err){
                            console.log(JSON.stringify(err));
                            return res.send(404,err);
                        }else{
                            return res.json({
                                nbCaptures : nbCaptures,
                                captures : captures
                            });
                        }
                    });
                }
            });
        }
		else if(capteur_departement!==""){
			console.log('Recherche département !');
            var nbCaptures = 0;
			Capture.find({departement:capteur_departement,date:{$gte:capteur_dateDeb,$lte:capteur_dateFin}}).exec(function(err,captures){
				if(err){
					return res.send(404,err);
                }else{
                    nbCaptures = captures.length;
					Capture.find({departement:capteur_departement,date:{$gte:capteur_dateDeb,$lte:capteur_dateFin}}).skip(capteur_skip).limit(capteur_limit).exec(function(err,captures){
                        if(err)
                            return res.send(404,err);
                        else
                            return res.json({
                                nbCaptures : nbCaptures,
                                captures : captures
                            });
                    });
                }
			});
		}
		else{
			return res.send(404,'Données incorrectes');
		}
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
		        		var d = new Date();
						var day = d.getDate();
						var month = d.getMonth() + 1;
						var year = d.getFullYear();
						if(month<10){
							month = '0' + month;
						}
						capture.date = day + '/' + month + '/' + year;
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