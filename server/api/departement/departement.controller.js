'use strict';
//MODEL
var Departement = require('./departement.model');

/*******************************************************************************************
                ~ FONCTIONS ~
*******************************************************************************************/

var validationError = function(res, err) {
  return res.json(422, err);
};

//Récupère tous les département
exports.getAll = function(req,res,next){
  Departement.find({}).exec(function(err,departements){
    if(err)
      return res.send(404,err);
    else
      res.json(departements);
  });
};

//Récupère les villes par rapport à leur code
exports.getWithCode = function(req,res,next){
	var critere = req.query;
	var departement_code = critere.code;
	//On incrémente code afin de déterminer si les données sont bien des number
	departement_code++;

	if(critere.code!==undefined && departement_code !== NaN){
		departement_code = critere.code
		Departement.find({code:/departement_code./}).exec(function(err,departements){
			if(err)
				return res.send(404,err);
			else
				return res.json(departements);
		});
	}
};

//Récupère les villes par rapport au début du nom de la ville
exports.getWithBeginName = function(req,res,next){
	var critere = req.query;
	var departement_nom = critere.nom;

	if(critere.nom!==undefined && typeof critere.nom === "string"){
		Departement.find({nom:/departement_nom./}).exec(function(err,departements){
			if(err)
				return res.send(404,err);
			else
				return res.json(departements);
		});
	}
};