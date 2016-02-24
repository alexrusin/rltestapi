(function() {
	angular.module('myQuiz').factory('FormFactory', ['$http', 
		function($http) {
			var factory = {};
			
			factory.submitForm = function(formdata, callback){
				$http.post("/api/tipshare", formdata).success(function(res){
				
				return callback(res);
			}).error(function(){
				return callback('error');
			});

			}
		

			return factory;
		}
	]);

}());