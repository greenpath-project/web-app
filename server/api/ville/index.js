'use strict';

var express = require('express');
var controller = require('./ville.controller');

var router = express.Router();

/******
	Méthode GET
*******/
//Récupère toutes les villes
router.get('/',controller.getAll);

module.exports = router;