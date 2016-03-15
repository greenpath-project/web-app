'use strict';
//MODEL
var Ville = require('./ville.model');

/*******************************************************************************************
                ~ FONCTIONS ~
*******************************************************************************************/

var validationError = function(res, err) {
  return res.json(422, err);
};

//Récupère toutes les villes
exports.getAll = function(req,res,next){
  Ville.find({},{nom:1,code:1}).exec(function(err,villes){
    if(err)
      return res.send(404,err);
    else
      res.json(villes);
  });
};

//Récupère les villes par rapport à leur code
exports.getWithCode = function(req,res,next){
	var critere = req.query;
	var ville_code = critere.code;
	//On incrémente code afin de déterminer si les données sont bien des number
	ville_code++;

	if(critere.code!==undefined && ville_code !== NaN){
		ville_code = critere.code
		Ville.find({code:/ville_code./}).exec(function(err,villes){
			if(err)
				return res.send(404,err);
			else
				return res.json(villes);
		});
	}
};

//Récupère les villes par rapport au début du nom de la ville
exports.getWithBeginName = function(req,res,next){
	var critere = req.query;
	var ville_nom = critere.nom;

	if(critere.nom!==undefined && typeof critere.nom === "string"){
		Ville.find({nom:/ville_nom./}).exec(function(err,villes){
			if(err)
				return res.send(404,err);
			else
				return res.json(villes);
		});
	}
};