var green = new ol.style.Circle({
    radius: 5,
    fill: new ol.style.Fill({
        color: '#4CAF50'
    }),
    stroke: new ol.style.Stroke({color: '#fff', width: 1})
});

var yellow = new ol.style.Circle({
    radius: 5,
    fill: new ol.style.Fill({
        color: '#CDC90A'
    }),
    stroke: new ol.style.Stroke({color: '#fff', width: 1})
});

var red = new ol.style.Circle({
    radius: 5,
    fill: new ol.style.Fill({
        color: '#cd0a0a'
    }),
    stroke: new ol.style.Stroke({color: '#fff', width: 1})
});

var styleFunction = function(feature) {
    
    if(feature.U.co2 > 400){
        return new ol.style.Style({
            image: red
        })
    }
    else if(feature.U.co2 < 400 && feature.U.co2 > 200){
        return new ol.style.Style({
            image: yellow
        })
    }
    else if(feature.U.co2 < 200){
        return new ol.style.Style({
            image: green
        })
    }
};