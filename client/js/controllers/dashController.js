"use strict"

angular.module('uiApp')
.controller('dashController',['$scope','$state','$http', function($scope, $state, $http){

var user= JSON.parse(localStorage.getItem("user")).data;
$scope.name=user.name;
var king="hello";




//map.js

//Set up some of our variables.
var map; //Will contain map object.
var marker = false; ////Has the user plotted their location marker? 
if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }



$scope.surfcheck=function(){
    var c1 = 0; var c2=0; 
    $scope.ck=0;
    if($scope.speed<8&&$scope.temp<38.5)
        c1=1;
    if($scope.weather!="Rain"&&$scope.weather!="Storm"&&$scope.weather!="Hurricanes"&&$scope.weather!="Fogg"&&$scope.weather!="Snow"&&$scope.weather!="Thundersnow"
&&$scope.weather!="Hail")
        c2=1;
    if(c1==1&&c2==1)
        $scope.ck=1;
};

function setPara(d){
     $scope.ck=null;
    $scope.lname=d.name;
    $scope.temp=d.main.temp-273.15;
    $scope.temp_min=d.main.temp_min-273.15;
    $scope.temp_max=d.main.temp_max-273.15;
    $scope.humidity=d.main.humidity;
    $scope.speed=d.wind.speed;
    $scope.weather=d.weather[0].main;
    $scope.pressure=d.main.pressure;
    console.log(d.main.pressure);
}
function weatherDetails(){
    $http.get("http://api.openweathermap.org/data/2.5/weather?lat="+$scope.latitude+"&lon="+$scope.longitude+"&APPID=a8f5261ee6863849df5a45497bb27163")
  .then(function(response){ 
    
    setPara(response.data);

  });
}
function showPosition(position) {
    
            $scope.latitude=position.coords.latitude;
            $scope.longitude=position.coords.longitude;
            $scope.$apply();
            weatherDetails();
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
        console.log(JSON.stringify( place.geometry.location))
        $scope.latitude = JSON.parse(JSON.stringify(place.geometry.location)).lat;
        $scope.longitude = JSON.parse(JSON.stringify(place.geometry.location)).lng;
        $scope.$apply();
        weatherDetails();

    });
   marker.setPosition(centerOfMap);
    //Listen for any clicks on the map.
    google.maps.event.addListener(map, 'click', function(event) {                
        //Get the location that the user clicked.
        var clickedLocation = event.latLng;
        console.log(JSON.stringify(clickedLocation))
        $scope.latitude = JSON.parse(JSON.stringify(clickedLocation)).lat;
        $scope.longitude = JSON.parse(JSON.stringify(clickedLocation)).lng;
         $scope.$apply();
         weatherDetails()
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