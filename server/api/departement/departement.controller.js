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