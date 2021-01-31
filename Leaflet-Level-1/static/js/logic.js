// Add tile layer
var lightmap=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});


// Add earthquake layer
var earthquakes = L.layerGroup();
// Create map object
var myMap = L.map("mapid", {
    center: [37.09, -95.71],
    zoom: 2,
  });

lightmap.addTo(myMap);

// Store API
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Grab data with with 
d3.json(url, function(response) {
    console.log(response);
   
    // Choose marker color
function markercolor(depth) {
    return depth > 100 ? '#800026' :
    depth > 80  ? '#BD0026' :
    depth  > 60  ? '#E31A1C' :
    depth  > 40  ? '#FC4E2A' :
    depth  > 30   ? '#FD8D3C' :
    depth  > 20   ? '#FEB24C' :
    depth  > 10   ? '#FED976' :
               '#FFEDA0';
    
}

// marker size
function markersize(magnitude) {
    return magnitude * 4
}



L.geoJSON(response, {
        pointtoLayer: function(feature, latlng){
            return L.circleMarker(latlng, {
                color:"black",
                fillColor: markercolor(feature.geometry.coordinates[2]),
                radius:markersize(feature.properties.mag),
                stroke:True,
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
            },

        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h3>" +feature.properties.place + "<h3><hr><p>Date: " + feature.properties.time + "</p><br><p>Magnitude: "
            +feature.properties.mag + "</p><br><p>Depth: " + feature.geometry.coordinates[2]+"</p>");}
        
    }).addTo(myMap);
 

});



