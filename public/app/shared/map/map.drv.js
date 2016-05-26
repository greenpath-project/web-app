angular.module('greenPathApp').directive('olMap', ['$timeout', '$rootScope', 'Map', function($timeout, $rootScope, Map){
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        templateUrl: './app/shared/map/map.vw.html',
        link: function(scope, element, attrs){
            
            $timeout(function(){
                 
                window.app = {};
                var app = window.app
                
                var extent = ol.proj.transformExtent([-0.5, 44, -0.6, 45], 'EPSG:4326', 'EPSG:3857');
                    
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
                app.changeLayer = function(opt_options) {
                    var options = opt_options || {};

                    var button = document.createElement('button');
                    button.innerHTML = 'L';

                    var this_ = this;
                    var handleChangeLayer = function() {
                        if(baseLayerBing.getVisible()){
                            baseLayerBing.setVisible(false);
                            baseLayerOsm.setVisible(true);
                        }
                        else {
                            baseLayerBing.setVisible(true);
                            baseLayerOsm.setVisible(false);
                        }
                    };

                    button.addEventListener('click', handleChangeLayer, false);

                    var element = document.createElement('div');
                    element.className = 'change-layer ol-unselectable ol-control';
                    element.appendChild(button);

                    ol.control.Control.call(this, {
                    element: element,
                    target: options.target
                    });

                };
                ol.inherits(app.changeLayer, ol.control.Control);   
                
                scope.map = new ol.Map({
                    controls: ol.control.defaults({
                        attribution: false
                    }).extend([
                        new ol.control.FullScreen(),
                        new ol.control.ScaleLine(),
                        new ol.control.OverviewMap(),
                        new ol.control.ZoomSlider(),
                        new app.changeLayer()
                    ]),
                    layers: [baseLayerOsm, baseLayerBing, layerPoints, layerCluster],
                    target: document.getElementById('map'),
                    view: new ol.View({
                        center:  ol.proj.transform([-0.57, 44.86], 'EPSG:4326', 'EPSG:3857'),
                        zoom: 12,
                        maxZoom: 18,
                        minZoom: 6,
                        extent: extent
                    }),
                    loadTilesWhileInteracting: true
                });
                
                if($rootScope.hideInterface){
                    $('#map').addClass('hide-interface');
                    var height = $(window).height();
                    $('#map').css('height', height);
                    scope.map.updateSize();
                }
                else{
                    var height = $(window).height();
                    height = height * (70 / 100);
                    $('#map').css('height', height);
                    $('#map').css('width', '100%');
                    scope.map.updateSize();
                }
                
                scope.map.on('moveend', function (e) {
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
                if(closer != null){
                    closer.onclick = function() {
                        overlay.setPosition(undefined);
                        closer.blur();
                        return false;
                    }; 
                }           
                
                scope.map.on('singleclick', function(evt) {
                    if(layerPoints.getVisible()){
                        var feature = layerPoints.getSource().getClosestFeatureToCoordinate(evt.coordinate);

                        var date = feature.U.date.replace('T', ' ').replace('Z', '');
                        
                        var air = '<li> Qualité air : Pas de données.</li>';
                        if(feature.U.co2 > 400){
                            var air = '<li> Qualité air : Mauvaise.</li>';
                        }
                        else if(feature.U.co2 < 400 && feature.U.co2 > 200){
                            var air = '<li> Qualité air : Moyenne.</li>';
                        }
                        else if(feature.U.co2 < 200){
                            var air = '<li> Qualité air : Bonne.</li>';
                        }

                        content.innerHTML = '<ul style="font-family: Arial; font-size: small;">'
                            + '<li> Ville : ' + feature.U.ville + '</li>'
                            + '<li> Departement : ' + feature.U.departement + '</li>'
                            + '<li> Date : ' + date + '</li>'
                            + air                              
                            + '<li> Son : ' + feature.U.son + ' dB</li>'
                            + '<li> Humidite : '+ feature.U.humidite +' %</li>'
                            + '<li> Temperature : ' + feature.U.temperature + ' °C</li>' 
                            + '<li> Longitude : ' + feature.U.longitude + '</li>'
                            + '<li> Latitude : ' + feature.U.latitude + '</li>'  
                            + '</ul>'

                        overlay.setPosition(feature.getGeometry().getCoordinates());
                        scope.map.getView().setCenter(feature.getGeometry().getCoordinates());
                    }
                });
                
                scope.map.addOverlay(overlay);
                
            })

        }
    };
}]);