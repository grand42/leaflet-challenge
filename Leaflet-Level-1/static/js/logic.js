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
    center: [20, -70],
    zoom: 2,
    layers:[lightmap, earthquakes]
  });

lightmap.addTo(myMap);

// Store API
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Grab data with with 
d3.json(url, function(response) {
    console.log(response);
   
    // Choose marker color
function markerColor(depth) {
    switch(true) {
        case( depth > 100):
            return '#FF0000';
        case( depth > 80):
            return '#ff8800';
        case( depth > 50):
            return '#FFA500 ';
        case( depth > 20):
            return '#FFCC00';
        case( depth > 10):
            return '#FFFF00';
        default:
            return '#99ff00';
    }
}

// marker size
function markerSize(magnitude) {
    return magnitude * 4;
}



L.geoJSON(response, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          // Set the style of the markers based on properties.m
          {
            radius: markerSize(feature.properties.mag),
            fillColor: markerColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.5,
            color: "black",
            stroke: true,
            weight: 0.5
          }
        );
      },

        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h3>" +feature.properties.place + "<h3><hr><p>Date: " + new Date(feature.properties.time) + "</p><p>Magnitude: "
            +feature.properties.mag + "</p><p>Depth: " + feature.geometry.coordinates[2]+"</p>");}
        
    }).addTo(earthquakes);
 
earthquakes.addTo(myMap);

//Add legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var depths = [ 0, 10 ,20,50, 80, 100];
    var labels=[];
    var legendInfo = "<h2>Depth</h2><hr>";
      div.innerHTML = legendInfo;
      depths.forEach(function(limit, index) {
        labels.push(depths[index] + (depths[index + 1] ? '&ndash;' + depths[index + 1] + '<br>' : '+') +"<li style=\"background-color: " + markerColor(depths[index]+1) + "\"></li>"
        );
      });
  
      div.innerHTML += labels.join("") 
      return div;
    }
    legend.addTo(myMap);
});



