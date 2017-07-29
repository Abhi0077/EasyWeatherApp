"use strict"

angular.module('uiApp')
.controller('mapController',['$scope', function($scope){

var user= JSON.parse(localStorage.getItem("user")).data;
$scope.name=user.name;









//map.js
//
//Set up some of our variables.
var map; //Will contain map object.
var marker = false; ////Has the user plotted their location marker? 
if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
function showPosition(position) {
console.log(position)
    var centerOfMap = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

     //Map options.
    var options = {
      center: centerOfMap, //Set center.
      zoom: 16 //The zoom value.
    };
map = new google.maps.Map(document.getElementById('map'), options);
     var marker = new google.maps.Marker({
            map: map
        });

var input = document.getElementById('searchInput');
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);


autocomplete.addListener('place_changed', function() {
        
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
  
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location)
        }
    
        marker.setPosition(place.geometry.location);
        
    });
   marker.setPosition(centerOfMap);
    //Listen for any clicks on the map.
    google.maps.event.addListener(map, 'click', function(event) {                
        //Get the location that the user clicked.
        var clickedLocation = event.latLng;
        

      
        //If the marker hasn't been added.
        if(marker === false){
            //Create the marker.
            marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true //make it draggable
            });
            //Listen for drag events!
            google.maps.event.addListener(marker, 'dragend', function(event){
                console.log(event)
            });
        } else{
            //Marker has already been added, so just change its location.
            marker.setPosition(clickedLocation);
        }

    });
} 
    

   

    
        


}]);