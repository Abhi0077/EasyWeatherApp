"use strict"

angular.module('uiApp')
.controller('profileController', ['$scope','restService',function($scope,restService){


			console.log('hello')
			$scope.image = false;
			$scope.user= JSON.parse(localStorage.getItem("user")).data;
			console.log($scope.user)
			var email=$scope.user.email;
			console.log(email);
			$scope.upcheck=false;

			if($scope.user.iname){
				$scope.image = true;
				$scope.img_url = 'http://localhost:9090/static/'+$scope.user.iname;
			}

	$scope.update = function(updateData){

		restService.update(updateData).then(function(response){
			console.log(response)
			if(response.data.status==0) {

				
				localStorage.setItem('user',JSON.stringify(response.data));
				$scope.user= JSON.parse(localStorage.getItem("user")).data;
				$scope.upcheck=true;
				$scope.$apply();
				console.log('data updated')


			} else {
						console.log('error');
			  }

		});
	    
	};



	$scope.uploadFile = function(){
		var file = $scope.myFile;
         var fd = new FormData();
           fd.append('file', file);
		restService.fileUpload(fd).then(function(response){
			console.log(response);
			restService.fileSave(response, email).then(function(response){
				
				console.log(response);
				localStorage.setItem('user',JSON.stringify(response.data));
				$scope.user= JSON.parse(localStorage.getItem("user")).data;
				$scope.img_url = 'http://localhost:9090/static/'+$scope.user.iname;
				$scope.$apply();
				alert('file saved');
				console.log('data updated')
			})
		})
	}

     





}]).directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;

              var reader = new FileReader();
                    reader.onload = function (e) {
                        scope.image = e.target.result;
                        scope.img_url = 'http://localhost:9090/static/'+$scope.user.iname;
                        scope.$apply();
                    }



                element.on('change', function() {
                        reader.readAsDataURL(element[0].files[0]);
                    });

				element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                     });
                 });
           }
        };
    }]);
