-- Role: greenpath

-- DROP ROLE greenpath;

CREATE ROLE greenpath LOGIN
  ENCRYPTED PASSWORD 'md5c38662fb24ce9743b14fd533f1807599'
  NOSUPERUSER INHERIT CREATEDB NOCREATEROLE REPLICATION;

-- Database: greenpath

-- DROP DATABASE greenpath;

CREATE DATABASE greenpath
  WITH OWNER = greenpath
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'French_France.1252'
       LC_CTYPE = 'French_France.1252'
       CONNECTION LIMIT = -1;

ALTER DATABASE greenpath
  SET search_path = "$user", public, tiger;


	   
-- Enable PostGIS (includes raster)
CREATE EXTENSION postgis;
-- Enable Topology
CREATE EXTENSION postgis_topology;
CREATE EXTENSION postgis_topology;
-- Enable PostGIS Advanced 3D 
-- and other geoprocessing algorithms
-- sfcgal not available with all distributions
CREATE EXTENSION postgis_sfcgal;
-- fuzzy matching needed for Tiger
CREATE EXTENSION fuzzystrmatch;
-- rule based standardizer
CREATE EXTENSION address_standardizer;
-- example rule data set
CREATE EXTENSION address_standardizer_data_us;
-- Enable US Tiger Geocoder
CREATE EXTENSION postgis_tiger_geocoder;

-- Table: public.villes

-- DROP TABLE public.villes;

CREATE TABLE public.villes
(
  code character varying(5),
  nom character varying(255),
  departement character varying(5)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.villes
  OWNER TO greenpath;
  
-- Table: public.departements

-- DROP TABLE public.departements;

CREATE TABLE public.departements
(
  code character varying(5),
  nom character varying(255)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.departements
  OWNER TO greenpath;
  
-- Table: public.captures

-- DROP TABLE public.captures;

CREATE TABLE public.captures
(
  latitude double precision,
  longitude double precision,
  temperature double precision,
  humidite double precision,
  son double precision,
  co2 double precision,
  ville character varying(5),
  departement character varying(4),
  date timestamp without time zone,
  geom geometry
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.captures
  OWNER TO greenpath;



