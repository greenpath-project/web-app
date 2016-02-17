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
