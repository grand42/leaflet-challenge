// Create map object
var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
  });
  
// Store API
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";