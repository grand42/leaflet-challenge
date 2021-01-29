// Create map object
var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
  });

// Add tile layer
var street = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

street.addTo(myMap);


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
        style: function(feature){
            return{
                color:"white",
                fillColor: markercolor(feature.geometry.coordinates[2]),
                radius:markersize(feature.properties.mag)
            }
        }
    }
 

});

