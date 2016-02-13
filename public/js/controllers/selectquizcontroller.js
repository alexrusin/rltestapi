(function(){
	angular.module('myQuiz').controller('SelectQuizController', ['$rootScope', '$scope', function($rootScope, $scope ){

		$scope.selectQuiz = function(id){
			$rootScope.quiz = id;
			
		}


	}]);


})();