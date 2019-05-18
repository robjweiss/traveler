import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Map } from './components/Map';
import $ from "jquery";
import haversine from "haversine";
const htmlToImage = require('html-to-image');
import download from "downloadjs";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
ReactDOM.render(<App />, document.getElementById("app"));

var map;
var markers = [];
const AVERAGE_PLANE_SPEED_MPH = 500;
//Cruise speed between 547–575 mph, so I'm going to go with ~500 including liftoff/landing



document.addEventListener("DOMContentLoaded", function() {
  let mapElement = document.getElementById('map');
  Map.loadGoogleMapsApi().then(function(googleMaps) {
  map = Map.createMap(googleMaps, mapElement);
  });
});

function geocodeLoc(geocoder, resultsMap, address) {
    geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
        markers.push(new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            }));
          } else {
            alert('Geocode failed: ' + status);
          }

        });

	  
}

$('form').on('submit', function(e){
	markers = [];
    var from = $("input#from").val();
	var to = $("input#to").val();

	var point1 = $("option[value='" + from + "']").prop("label");
	var point2 = $("option[value='" + to + "']").prop("label");

	var geocoder = new google.maps.Geocoder();
	geocodeLoc(geocoder, map, point1);
	geocodeLoc(geocoder, map, point2);
	
	setTimeout(function(){
		let coords = [];
		markers.forEach(function(m) {
			coords.push(m.getPosition());
		});
		
		var flightPath = new google.maps.Polyline({
          path: coords,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
		
		var distance = haversine({"latitude": coords[0].lat(), "longitude": coords[0].lng()}, {"latitude": coords[1].lat(), "longitude": coords[1].lng()}, {unit: 'mile'});
		$('#speed').css('display','block');
		$("#speed").append("Estimated distance travelled: " + distance.toFixed(2) + " miles")
		$("#speed").append("<br /> Estimated flight time: " + (distance/AVERAGE_PLANE_SPEED_MPH).toFixed(2) + " hours")
        flightPath.setMap(map);
		}, 1000);
	
});



$('button#img').on('click', function(e){
htmlToImage.toPng(document.getElementById('body'))
  .then(function (dataUrl) {
    download(dataUrl, 'my-screenshot.png');
  });
});

$('button#pdf').on('click', function(e){
	const filename  = 'my-pdf.pdf';
	$('#map').css('display','none');
	html2canvas(document.getElementById('body')).then(canvas => {
		let pdf = new jsPDF('p', 'mm', 'a4');
		pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
		pdf.save(filename);
		$('#map').css('display','block');
	});

});
if (module.hot) {
  module.hot.accept();
}
