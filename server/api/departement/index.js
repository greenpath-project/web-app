'use strict';

var express = require('express');
var controller = require('./departement.controller');

var router = express.Router();

/******
	Méthode GET
*******/
//Récupère toutes les départements
router.get('/',controller.getAll);

module.exports = router;