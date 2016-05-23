var image = new ol.style.Circle({
    radius: 5,
    fill: new ol.style.Fill({
        color: '#3399CC'
    }),
    stroke: new ol.style.Stroke({color: '#fff', width: 1})
});

var styles = {
    'Point': new ol.style.Style({
        image: image
    })};

var styleFunction = function(feature) {
    return styles[feature.getGeometry().getType()];
};