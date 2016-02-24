(function(){

angular.module('myQuiz').controller('FormController', ['$scope', 'FormFactory', 
	function($scope, FormFactory){
		$scope.feedback = "";

	$scope.submitForm = function(){
		
		formdata={
			"title": $scope.myform.title,
			"author":$scope.myform.author,
			"article":$scope.myform.article,
			"active": 1
			}

		formdata=JSON.stringify(formdata);
		
		FormFactory.submitForm(formdata, function(response){
			if(response) {
				$scope.feedback = "Thank you for submitting Tip Share article."
			} else {
				$scope.feedback = "Sorry, there was an error submitting your article.  Please try agin later."
			}
		});
	}

	}]);
})();