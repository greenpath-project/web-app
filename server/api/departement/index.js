'use strict';

var express = require('express');
var controller = require('./departement.controller');

var router = express.Router();

/******
	Méthode GET
*******/
//Récupère toutes les départements
router.get('/',controller.getAll);

//Récupère les départements par rapport à leur code
router.get('/code',controller.getWithCode);

//Récupère les départements par rapport au début du nom du département
router.get('/nom',controller.getWithBeginName);

module.exports = router;