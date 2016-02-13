(function(){

<<<<<<< HEAD
	angular.module('myQuiz').controller('QuizController', [ '$rootScope', '$scope', '$http', '$sce', '$window', 
		function($rootScope, $scope, $http, $sce, $window){
			var quizName = $rootScope.quiz.toLowerCase();
=======
	angular.module('myQuiz').controller('QuizController', ['$rootScope', '$scope', '$sce', '$window', 'QuizFactory',
		function($rootScope, $scope, $sce, $window, QuizFactory){
			$scope.quizName = $rootScope.quiz;
>>>>>>> refactor
			$scope.score = 0;
			$scope.activeQuestion = -1;
			$scope.activeQuestionAnswer = 0;
			$scope.percentage = 0;

<<<<<<< HEAD
			$http.get(quizName + '.json').then(function(quizData){
				$scope.myQuestions = quizData.data;
				$scope.myQuestions = shuffleSlice($scope.myQuestions);
				$scope.totalQuestions = $scope.myQuestions.length;
=======
			QuizFactory.getQuestions($scope.quizName, function(data){
				if (data === 'error'){
					$scope.quizName = "Sorry, could not retrieve quiz data";
				} else {
					$scope.myQuestions = data;
					$scope.totalQuestions = $scope.myQuestions.length;
				}
>>>>>>> refactor
			});

			$scope.selectAnswer = function(qIndex, aIndex){
				var questionState = $scope.myQuestions[qIndex].questionState;
			

				if( questionState != 'answered'){
					$scope.myQuestions[qIndex].selectedAnswer = aIndex;
					var correctAnswer = $scope.myQuestions[qIndex].correct;
					$scope.myQuestions[qIndex].correctAnswer = correctAnswer;

					if(aIndex === correctAnswer){
						$scope.myQuestions[qIndex].correctness = 'correct';
						$scope.score += 1;
					} else{
						$scope.myQuestions[qIndex].correctness = 'incorrect';
					}

					$scope.myQuestions[qIndex].questionState = 'answered';

				}

				$scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(1);

			}

			$scope.isSelected = function(qIndex, aIndex){
				return  $scope.myQuestions[qIndex].selectedAnswer === aIndex;
			}

			$scope.isCorrect = function(qIndex, aIndex){
				return  $scope.myQuestions[qIndex].correctAnswer === aIndex;
			}

			$scope.selectContinue = function(){
				return $scope.activeQuestion += 1;
			}

			$scope.shareLinks = function(percentage){
				

				return $sce.trustAsHtml(QuizFactory.shareLinks(percentage, $scope.quizName));

			}		

			$scope.retakeQuiz = function(){
				$rootScope.quiz = $scope.quizName;
				$window.location.reload();

				
			}

			


		}]);


})();