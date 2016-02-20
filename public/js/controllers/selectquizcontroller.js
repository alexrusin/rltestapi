(function(){
	angular.module('myQuiz').controller('SelectQuizController',
	 ['$rootScope', '$scope', 'QuizFactory',
	 function($rootScope, $scope, QuizFactory ){

		QuizFactory.getQuizData("/api/quizes", function(data){
				if (data === 'error'){
					$scope.quizes = "Sorry, could not retrieve quiz data";
				} else {
					$scope.quizes = data;
				}
			});


	}]);


})();