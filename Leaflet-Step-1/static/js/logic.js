function markerSize(mag) {
  return mag * 10;
};

// make function to determine color based on magnitude (see day 2 activity 1 NY boroughs) with if else
// https://www.w3schools.com/colors/colors_picker.asp
function markerColor(mag) {
  if (mag > 8) {
    return '#ff0066'
  } else if (mag > 5) {
    return '#ff6600'
  } else if (mag > 2) {
    return '#ffcc00'
  } else {
    return '#33cc33'
  }
};

function opacity(depth) {
  if (depth > 8) {
    return .8
  } else if (depth > 5) {
    return .6
  } else if (depth > 2) {
    return .4
  } else {
    return .3
  }
};

// day 1 activity 10
// Store our API endpoint inside url (Chose all earthquakes in last 7 days)
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL
d3.json(url, function (data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    onEachFeature: function (feature, layer) {

      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p><br><p> Magnitude: " + feature.properties.mag + "</p>")
    }, pointToLayer: function (feature, latlong) {
      return new L.circleMarker(latlong,
        {
          radius: markerSize(feature.properties.mag),
          fillColor: markerColor(feature.properties.mag),
          fillOpacity: opacity(feature.geometry.coordinates[2]),
        })
    }
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

// day 1 activity 8/10
// Adding tile layer
function createMap(earthquakes) {
  var lightLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

  var satelliteLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  });

  var baseMaps = {
    Light: lightLayer,
    Satellite: satelliteLayer
  };

  var overlayMap = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("mapid", {
    center: [39.8283, -98.5795],
    zoom: 4,
    layers: [lightLayer, earthquakes]
  })

  // L.control.layers(baseMaps, overlayMaps).addTo(myMap)
  L.control.layers(baseMaps, overlayMap, {
    collapsed: false
  }).addTo(myMap)

}




