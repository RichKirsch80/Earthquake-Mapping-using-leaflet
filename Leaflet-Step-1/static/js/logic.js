// Store our API endpoint inside url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Perform a GET request to the query URL
d3.json(url).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

// function to determine circle color by depth
function getColor(depth) {
  switch(true)
  {
    case depth > 90:
      return "#FF5733";
    case depth > 70:
      return "#DC7633";
    case depth > 50:
      return "orange";
    case depth > 30:
      return "yellow";
    case depth > 10:
      return "#7DCEA0";
    default:
      return "#D5F5E3"
  }
}

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place, Magnitude and depth of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup( "Location: " + feature.properties.place + "<br>" + "Depth: " + feature.geometry.coordinates[2] 
    + "<br>" + "Magnitude: " + feature.properties.mag + "</p>");
   
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius: (feature.properties.mag*5),
        color: getColor(feature.geometry.coordinates[2]),
        fillcolor: getColor(feature.geometry.coordinates[2]),
        fillOpacity: ".5"
      });
    },
    onEachFeature: onEachFeature
    });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define us map layers
  var usmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "US Map": usmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      40.7128, -74.0059
    ],
    zoom: 4,
    layers: [usmap, earthquakes]

  });
// Set up the legend
var legend = L.control({ 
  position: "bottomright"
 });

legend.onAdd = function() {
  var div = L.DomUtil.create("div", "Legend");
  div.innerHTML = "<h3>Depth</h3>";

  var depthList = [0, 10, 30, 50, 70, 90]
  
  // loop to set colors for each depth range
  for (var i = 1; i < depthList.length; i++)
  {
    div.innerHTML += "<div>"
                  + "<i style='background-color: " 
                    + getColor(depthList[i] - 1)
                    + ";'>&nbsp;</i>"
                  + depthList[i -1] + " - " + depthList[i]
                  + "</div>"
  }

  div.innerHTML += "<div>"
                  + "<i style='background-color: " 
                  + getColor(91)
                  + ";'>&nbsp;</i>"
                  + depthList[depthList.length - 1] + "+" 
                  + "</div>"
  return div;
};

// Adding legend to the map
legend.addTo(myMap);

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  
};


