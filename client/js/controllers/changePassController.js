"use strict"

angular.module('uiApp')
.controller('changePassController', ['$scope','restService', function($scope,restService){

			
			$scope.email= JSON.parse(localStorage.getItem("user")).data.email;

			
		

	$scope.change = function(changeData){
					 changeData.check=0;
					 var pass = JSON.parse(localStorage.getItem("user")).data.password;
				if(changeData.oldpassword!=pass)
					{alert('enter correct password')}

				else{

		restService.change(changeData).then(function(response){

			console.log(response)
			if(response.data.status==0) {

				changeData.check=1;
				localStorage.setItem('user',JSON.stringify(response.data));
				console.log(JSON.parse(localStorage.getItem("user")).data);

				console.log('data updated')


			} else {
						console.log('error');
			  }

		});
	}
	    
	};


}]);
