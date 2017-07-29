"use strict"

angular.module('uiApp')
.controller('registerController', ['$scope','restService','$state', function($scope,restService,$state){


	$scope.submit = function(registerData){
		if(registerData.password == registerData.conpassword){
		restService.register(registerData).then(function(response){
			console.log('hi')
			console.log(response)
			localStorage.setItem('user',JSON.stringify(response.data));
				$state.go('dash');
		});
	    } else {
	    	alert('passwords deos not match');
	    }
	};


}]);
