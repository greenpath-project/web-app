'use strict';

var express = require('express');
var controller = require('./ville.controller');

var router = express.Router();

/******
	Méthode GET
*******/
//Récupère toutes les villes
router.get('/',controller.getAll);

//Récupère les villes par rapport à leur code
router.get('/code',controller.getWithCode);

//Récupère les villes par rapport au début du nom de la ville
router.get('/nom',controller.getWithBeginName);

module.exports = router;