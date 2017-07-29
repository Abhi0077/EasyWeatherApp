"use strict"

angular.module('uiApp')
.controller('loginController', ['$scope','restService','$state', function($scope,restService,$state){
        

	$scope.submit = function(loginData){
		restService.login(loginData).then(function(response){
			
			if(response.data.status==1)
			{    console.log(response)
				//invalin login
					loginData.check=0;
			}
			else
			{
				//valid login
				
				localStorage.setItem('user',JSON.stringify(response.data));
				$state.go('dash');
			}
		});
	};



}]);
