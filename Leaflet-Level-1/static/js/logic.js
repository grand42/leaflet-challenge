// Add tile layer
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Add earthquake layer
var earthquakes = L.layerGroup();
// Create map object
var myMap = L.map("mapid", {
    center: [40.7, -73.95],
    zoom: 11,
    layers:[lightmap, earthquakes]
  });
lightmap.addTo(myMap);



// Store API
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
// Choose marker color

function markercolor(depth) {
    return depth > 100? '#800026' :
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
    return magnitude * 5
}
// Grab data with with 
d3.json(url, function(response) {
   
    L.geoJson(response, {
        pointtoLayer: function(feature, latlng){
            return L.circlemarker(latlng ,{
                color:"black",
                fillColor: markercolor(feature.geometry.coordinates[2]),
                radius:markersize(feature.properties.mag),
                stroke:True
            });
        }
    }).addTo(earthquakes);
 
earthquakes.addTo(myMap);
});
console.log("Test");


