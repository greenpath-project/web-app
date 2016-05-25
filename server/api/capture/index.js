'use strict';

var express = require('express');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://greenpath:greenpath@localhost:5432/greenpath';

var router = express.Router();

/**
 * Récupère toutes les captures
 * Méthode GET
 */
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
        var query = client.query("SELECT * FROM Captures");

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

/**
 * Récupère les captures correspondant à la recherche effectuée
 * Méthode GET
 */
router.get('/releve/',function(req,res,next){
	//Récupération des critères de recherche
	var critere = req.query;
	var capteur_dateDeb = critere.dateDeb;
	var capteur_dateFin = critere.dateFin;
	var capteur_ville = critere.ville;
	var capteur_departement = critere.departement;
    var capteur_skip = parseInt(critere.skip);
    var capteur_limit = parseInt(critere.limit);

    var results = [];

	var data = {ville:capteur_ville,departement:capteur_departement,dateDebut:capteur_dateDeb,dateFin:capteur_dateFin,skip:capteur_skip,limit:capteur_limit};

	 // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        if(data.dateDebut=="" && data.dateFin==""){
			var nbCaptures = 0;
			if(data.villes!==""){
		        // SQL Query > Select Data
		        var query = client.query("SELECT * FROM Captures WHERE ville=$1",[data.ville]);

		        // Stream results back one row at a time
		        query.on('row', function(row) {
		            results.push(row);
		        });

		        // After all data is returned, close connection and return results
		        query.on('end', function() {
		            if(results.length>0){
		            	nbCaptures = results.length;
		            	results = [];
		            	var query = client.query("SELECT * FROM Captures WHERE ville=$1 OFFSET $2 LIMIT $3",[data.ville,data.skip,data.limit]);
		            	 // Stream results back one row at a time
				        query.on('row', function(row) {
				            results.push(row);
				        });
				        // After all data is returned, close connection and return results
				        query.on('end', function() {
				            done();
				            return res.json({
								nbCaptures : nbCaptures,
								captures : results
							});
				        });
		            }
		        });
		    }
		    else if(data.departement!==""){
		    	// SQL Query > Select Data
		        var query = client.query("SELECT * FROM Captures WHERE departement=$1",[data.departement]);

		        // Stream results back one row at a time
		        query.on('row', function(row) {
		            results.push(row);
		        });

		        // After all data is returned, close connection and return results
		        query.on('end', function() {
		            if(results.length>0){
		            	nbCaptures = results.length;
		            	results = [];
		            	var query = client.query("SELECT * FROM Captures WHERE departement=$1 OFFSET $2 LIMIT $3",[data.departement,data.skip,data.limit]);
		            	 // Stream results back one row at a time
				        query.on('row', function(row) {
				            results.push(row);
				        });
				        // After all data is returned, close connection and return results
				        query.on('end', function() {
				            done();
				            return res.json({
								nbCaptures : nbCaptures,
								captures : results
							});
				        });
		            }
		        });
		    }
		    else{
				return res.send(404,'Données incorrectes');
			}

		}
		else{

			data.dateDebut = new Date(data.dateDebut);
			data.dateFin = new Date(data.dateFin);

			if(data.ville!==""){
	            var nbCaptures = 0;
	            // SQL Query > Select Data
		        var query = client.query("SELECT * FROM Captures WHERE ville=$1 AND date BETWEEN $2 AND $3",[data.ville,data.dateDebut,data.dateFin]);

		        // Stream results back one row at a time
		        query.on('row', function(row) {
		            results.push(row);
		        });

		        // After all data is returned, close connection and return results
		        query.on('end', function() {
		            if(results.length>0){
		            	nbCaptures = results.length;
		            	results = [];
		            	var query = client.query("SELECT * FROM Captures WHERE ville=$1 AND date BETWEEN $2 AND $3 OFFSET $4 LIMIT $5",[data.ville,data.dateDebut,data.dateFin,data.skip,data.limit]);
		            	 // Stream results back one row at a time
				        query.on('row', function(row) {
				            results.push(row);
				        });
				        // After all data is returned, close connection and return results
				        query.on('end', function() {
				            done();
				            return res.json({
								nbCaptures : nbCaptures,
								captures : results
							});
				        });
		            }
		        });
	        }
	        else if(data.departement!==""){
            	var nbCaptures = 0;
            	// SQL Query > Select Data
		        var query = client.query("SELECT * FROM Captures WHERE departement=$1 AND date BETWEEN $2 AND $3",[data.departement,data.dateDebut,data.dateFin]);

		        // Stream results back one row at a time
		        query.on('row', function(row) {
		            results.push(row);
		        });

		        // After all data is returned, close connection and return results
		        query.on('end', function() {
		            if(results.length>0){
		            	nbCaptures = results.length;
		            	results = [];
		            	var query = client.query("SELECT * FROM Captures WHERE departement=$1 AND date BETWEEN $2 AND $3 OFFSET $4 LIMIT $5",[data.departement,data.dateDebut,data.dateFin,data.skip,data.limit]);
		            	 // Stream results back one row at a time
				        query.on('row', function(row) {
				            results.push(row);
				        });
				        // After all data is returned, close connection and return results
				        query.on('end', function() {
				            done();
				            return res.json({
								nbCaptures : nbCaptures,
								captures : results
							});
				        });
		            }
		        });
            }
            else{
				return res.send(404,'Données incorrectes');
			}
    	}
	})
});

/**
 * Enregistrement d'une capture
 * Méthode POST
 */
router.post('/',function(req,res,next){
	//Récupération des données envoyés par l'application
	var critere = req.body;
	var capteur_lng = critere.lng;
	var capteur_lat = critere.lat;
	var capteur_temperature = critere.temperature;
	var capteur_humidite = critere.humidite;
	var capteur_son = critere.son;
	var capteur_co2 = critere.co2;

	//On incrémente toutes les données afin de déterminer s'ils sont bien des number
	capteur_lng++;
	capteur_lat++;
	capteur_temperature++;
	capteur_humidite++;
	capteur_son++;
	capteur_co2++;

	//Création de la nouvelle capture
	var capture = new Capture();

	if(capteur_lng !== NaN)
		capture.lng = critere.lng;
	else
		capteur_lng = null;
	if(capteur_lat !== NaN)
		capture.lat = critere.lat;
	else
		capteur_lat = null;
	if(capteur_temperature !== NaN)
		capture.temperature = critere.temperature;
	else
		capteur_temperature = null;
	if(capteur_humidite !== NaN)
		capture.humidite = critere.humidite;
	else
		capteur_humidite = null;
	if(capteur_son !== NaN)
		capture.son = critere.son;
	else
		capteur_son = null;
	if(capteur_co2 !== NaN)
		capture.co2 = critere.co2;
	else
		capteur_co2 = null;

	if(capture.lng !== undefined || capture.lat !== undefined || capture.temperature !== undefined || capture.humidite !== undefined || capture.son !== undefined || capture.co2 !== undefined){

		geocoder.reverse({lat:capture.lat, lon:capture.lng})
		    .then(function(localisation) {
		        capture.ville = localisation[0].city;

		        var results = [];

				var data = {
					lng:critere.lng,
					lat:critere.lat,
					temperature:critere.temperature,
					humidite:critere.humidite,
					son:critere.son,
					co2:critere.co2,
					ville:localisation[0].city,
					departement:"",
					date:""
				};

				 // Get a Postgres client from the connection pool
			    pg.connect(connectionString, function(err, client, done) {
			        // Handle connection errors
			        if(err) {
			          done();
			          console.log(err);
			          return res.status(500).json({ success: false, data: err});
			        }

			        // SQL Query > Select Data
			        var query = client.query("SELECT Departements.nom FROM Villes,Departements WHERE Villes.code = Departements.code AND Villes.nom=$1",[data.ville]);

			        // Stream results back one row at a time
			        query.on('row', function(row) {
			            results.push(row);
			        });

			        // After all data is returned, close connection and return results
			        query.on('end', function() {
			            if(results.length>0){
			            	data.departement = results[0]['nom'];
			            	var d = new Date();
							data.date = d;
        					client.query("INSERT INTO Captures(lat,lng,temperature,humidite,son,co2,ville,departement,date) values($1, $2, $3, $4, $5, $6, $7, $8, $9)", [data.lat,data.lng,,data.temperature,data.humidite,data.son,data.co2,data.ville,data.departement,data.date]);
			            	done();
			            }
			        });
			    });
			});
	}
});

module.exports = router;