'use strict';

var express = require('express');
var controller = require('./capture.controller');

var router = express.Router();

/******
	Méthode GET
*******/
//Récupère toutes les captures
router.get('/',controller.getAll);
//Récupère les captures correspondant à la recherche effectuée
router.get('/releve/',controller.search);

/******
	Méthode POST
*******/
//Enregistrement d'une capture
router.post('/',controller.create);

module.exports = router;