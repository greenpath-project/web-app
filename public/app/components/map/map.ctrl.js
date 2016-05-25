angular.module('greenPathApp').controller('MapCtrl', ['$scope', '$timeout', 'Map', function($scope, $timeout, Map){  
       
    var extent = ol.proj.transformExtent([-0.575136, 44.862222,
                    -0.557862, 44.867297], 'EPSG:4326', 'EPSG:3857');
        
    var projection = new ol.proj.Projection({
        code: 'EPSG:4326',
        units: 'degrees',
        axisOrientation: 'neu'
    });   
  
    /**
     * Layers
     */
    var baseLayerOsm = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true
    });

    var baseLayerBing = new ol.layer.Tile({       
        preload: Infinity,
        source: new ol.source.BingMaps({
            key: 'Au3fQ87Xe7YpJ2Hm_LIO2b3r59cYZoiP_MWOuAT73r5tkuVt1Grl-W_MuWgpc8XA',
            imagerySet: 'AerialWithLabels',
            maxZoom: 19
        }),
        visible: false
    });

    var layerPoints = new ol.layer.Vector({
        extent: extent,
        source: Map(),
        style: styleFunction,
        visible: true
    });
    
    var styleCache = {};
    var layerCluster = new ol.layer.Vector({
        source: new ol.source.Cluster({
            distance: 40,
            source: Map()                 
        }),
        style: function(feature) {
            var size = feature.get('features').length;
            var style = styleCache[size];
            if (!style) {
                style = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 10,
                        stroke: new ol.style.Stroke({
                            color: '#fff'
                        }),
                        fill: new ol.style.Fill({
                            color: '#3399CC'
                        })
                    }),
                    text: new ol.style.Text({
                        text: size.toString(),
                        fill: new ol.style.Fill({
                            color: '#fff'
                        })
                    })
                });
                styleCache[size] = style;
            }
            return style;
        },
        visible: true
    });
    
    /**
     * Interactions
     */
    var mousePositionControl = new ol.control.MousePosition({
        target: document.getElementById('location'),
        coordinateFormat: ol.coordinate.createStringXY(5),
        undefinedHTML: 'No Data !',
        projection: projection
    });
    
    var map = new ol.Map({
        controls: ol.control.defaults({
            attribution: false
        }).extend([
            new ol.control.FullScreen(),
            new ol.control.ScaleLine(),
            new ol.control.OverviewMap(),
            new ol.control.ZoomSlider(),
            mousePositionControl
        ]),
        layers: [baseLayerOsm, baseLayerBing, layerPoints, layerCluster],
        target: document.getElementById('map'),
        view: new ol.View({
            center:  ol.proj.transform([-0.57, 44.86], 'EPSG:4326', 'EPSG:3857'),
            zoom: 12,
            maxZoom: 16,
            minZoom: 6,
            extent: extent
        }),
        loadTilesWhileInteracting: true
    });

    map.on('moveend', function (e) {
        var zoom = e.map.getView().getZoom();
        if(zoom < 12){
            layerCluster.setVisible(true);
            layerPoints.setVisible(false);
        }
        else if(zoom >= 12){
            layerCluster.setVisible(false);
            layerPoints.setVisible(true);
        }
    });
    
    $scope.changeBaseLayer = function(layer){
        if('osm' == layer){
            baseLayerBing.setVisible(false);
            baseLayerOsm.setVisible(true);
        }
        else if('bing' == layer){
            baseLayerBing.setVisible(true);
            baseLayerOsm.setVisible(false);
        }

    }
    
    /**
     * Popup
     */
    $timeout(function(){
        
         /**
         * Elements that make up the popup.
         */
        var container = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        var closer = document.getElementById('popup-closer');

        /**
         * Create an overlay to anchor the popup to the map.
         */
        var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        }));


        /**
         * Add a click handler to hide the popup.
         * @return {boolean} Don't follow the href.
         */
        closer.onclick = function() {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        }; 
        
        map.on('singleclick', function(evt) {
            if(layerPoints.getVisible()){
                var feature = layerPoints.getSource().getClosestFeatureToCoordinate(evt.coordinate);

                var date = feature.U.date.replace('T', ' ').replace('Z', '');

                 content.innerHTML = '<ul style="font-family: Arial">'
                    + '<li> Son : ' + feature.U.son + '</li>'
                    + '<li> Humidite : '+ feature.U.humidite +'</li>'
                    + '<li> Temperature : ' + feature.U.temperature + '</li>'
                    + '<li> Longitude : ' + feature.U.longitude + '</li>'
                    + '<li> Latitude : ' + feature.U.latitude + '</li>'
                    + '<li> Co2 : ' + feature.U.co2 + '</li>'
                    + '<li> Ville : ' + feature.U.ville + '</li>'
                    + '<li> Departement : ' + feature.U.departement + '</li>'
                    + '<li> Date : ' + date + '</li>'
                    + '</ul>'

                overlay.setPosition(evt.coordinate);
                
                map.getView().setCenter(evt.coordinate);
            }
        });
        
        map.addOverlay(overlay);
        
    })
    
}]);