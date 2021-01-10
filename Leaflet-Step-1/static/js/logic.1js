// Creating map object

var myMap = L.map("mapid").setView([39.8283, -98.5795], 5)

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);
// Use this link to get the geojson data. (Chose all earthquakes in last 7 days)
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// make function for markers to reflect magnitude of earthquake by size and depth by color. 
// Day 1 Activity 5
// Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.
function markerSize(magnitude) {
  return magnitude * 10;
};


// make function to determine color based on magnitude (see day 2 activity 1 NY boroughs) with if else
// https://www.w3schools.com/colors/colors_picker.asp
function markerColor(magnitude) {
  if (magnitude > 8) {
    return '#ff0066'
  } else if (magnitude > 5) {
    return '#ff6600'
  } else if (magnitude > 2) {
    return '#ffcc00'
  } else {
    return '#33cc33'
  }
};
// try use switch once I get code working and then can adjust the opacity func as well
// function markerColor(magnitude) {
//   switch (magnitude) {
//   case (magnitude > 8):
//     return 'red';
//   case (magnitude > 5):
//     return "orange";
//   case "(magnitude > 2):
//     return "yellow";
//   default:
//     return "green";
//   }
// }


// make function to adjust color opacity based on depth of earthquake - third coordinate on geometry.coordinates (same syntax as above just adjust opacity instead of color)
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

// use D3 to grab data and get markers on map (day 2 activity 2)
d3.json(url, function (response) {
  // print response to see how to pull information from json file
  console.log(response);
  console.log(response.features)
  var magnitude = response.feature.properties.magnitude
  console.log(magnitude)
  

  // for (var i = 0; i < response.features.length; i++) {
  //   var location = response.features

  //   if (location) {
  //     L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
  //   }
  // }
});

// bind popups (Day 2 activity 4)
// onEachFeature: function(feature, layer) {
//   layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Median Household Income:<br>" +
//     "$" + feature.properties.MHI2016);
// }
// }).addTo(myMap);

// create legend(Day 2 activity 4)
// var legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend");
//     var limits = geojson.options.limits;
//     var colors = geojson.options.colors;
//     var labels = [];

//     // Add min & max
//     var legendInfo = "<h1>Median Income</h1>" +
//       "<div class=\"labels\">" +
//         "<div class=\"min\">" + limits[0] + "</div>" +
//         "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//       "</div>";

//     div.innerHTML = legendInfo;

//     limits.forEach(function(limit, index) {
//       labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
//   };
