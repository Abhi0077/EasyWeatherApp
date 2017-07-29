"use strict"

angular.module('uiApp')
.factory('restService', ['$http','$q', function($http,$q){

	return {

		login: function(data){
		
					 return $q(function(resolve, reject) {
				   $http.post('http://localhost:9090/api/login', data).then(function(result){
					  resolve(result);
				      })
				})
		},
		
		register: function(data){
			return $q(function(resolve, reject){
				$http.post('http://localhost:9090/api/register',data).then(function(result){
					resolve(result);
				})
			})
		},

		update:  function(data){
			return $q(function(resolve, reject){
				$http.post('http://localhost:9090/api/profile',data).then(function(result){
					resolve(result);
				})
			})
		},


		fileUpload: function(file){
			return $q(function(resolve,reject){
				$http.post('http://localhost:9090/api/fileUpload', file,{
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
           }).success(function(data){
					resolve(data);
				}).error(function(error){
					console.log(error);
				})
			})
		},

		fileSave: function(name, mail){
			return $q(function(resolve,reject){
				var data={email:mail, iname:name};
				console.log(data);
				$http.post('http://localhost:9090/api/fileSave',data).then(function(result){
					resolve(result);
				})
			})
		},

		change: function(data){
			return $q(function(resolve, reject){
				$http.post('http://localhost:9090/api/changepass',data).then(function(result){
					resolve(result);
				})
			})
		}
		
	}


}])