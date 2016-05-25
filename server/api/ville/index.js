'use strict';

var express = require('express');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://greenpath:greenpath@localhost:5432/greenpath';

var router = express.Router();

/******
	Méthode GET
*******/
//Récupère toutes les villes
router.get('/',function(req,res,next){
	var results = [];

	 // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT nom, code FROM Villes");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });


    });
});

//Récupère les villes par rapport à leur code
router.get('/code',function(req,res,next){
	var critere = req.query;
	var ville_code = critere.code;
	//On incrémente code afin de déterminer si les données sont bien des number
	ville_code++;
	if(critere.code!==undefined && !isNaN(ville_code)){
		var results = [];

		var data = {code:new RegExp('^'+critere.code+'')};
	
		 // Get a Postgres client from the connection pool
	    pg.connect(connectionString, function(err, client, done) {
	        // Handle connection errors
	        if(err) {
	          done();
	          console.log(err);
	          return res.status(500).json({ success: false, data: err});
	        }

	        // SQL Query > Select Data
	        var query = client.query("SELECT * FROM Villes WHERE code=$1",[data.code]);

	        // Stream results back one row at a time
	        query.on('row', function(row) {
	            results.push(row);
	        });

	        // After all data is returned, close connection and return results
	        query.on('end', function() {
	            done();
	            return res.json(results);
	        });


	    });
	}
});

//Récupère les villes par rapport au début du nom de la ville
router.get('/nom',function(req,res,next){
	var critere = req.query;
	var ville_nom = critere.nom;
	if(critere.nom!==undefined && typeof critere.nom === "string"){
		var results = [];

		var data = {nom:new RegExp('^'+ville_nom+'')};
	
		 // Get a Postgres client from the connection pool
	    pg.connect(connectionString, function(err, client, done) {
	        // Handle connection errors
	        if(err) {
	          done();
	          console.log(err);
	          return res.status(500).json({ success: false, data: err});
	        }

	        // SQL Query > Select Data
	        var query = client.query("SELECT * FROM Villes WHERE nom=$1",[data.nom]);

	        // Stream results back one row at a time
	        query.on('row', function(row) {
	            results.push(row);
	        });

	        // After all data is returned, close connection and return results
	        query.on('end', function() {
	            done();
	            return res.json(results);
	        });


	    });
	}
});

module.exports = router;