(function(){

angular.module('myQuiz').controller('QuizController', 
	['$rootScope', '$scope', '$sce', '$window', '$routeParams', 'QuizFactory',
		function($rootScope, $scope, $sce, $window, $routeParams, QuizFactory){
			$scope.score = 0;
			$scope.activeQuestion = -1;
			$scope.activeQuestionAnswer = 0;
			$scope.percentage = 0;
			apiUrl = "/api/quizes/" + $routeParams.quizId
			$scope.quizName=$routeParams.quizName;

			QuizFactory.getQuizData(apiUrl, function(data){
				if (data === 'error'){
					$scope.quizName = "Sorry, could not retrieve quiz data";
				} else {
					$scope.myQuestions = QuizFactory.shuffleSlice(data);
					$scope.totalQuestions = $scope.myQuestions.length;
				}
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

			$scope.createShareLinks = function(percentage){
				

				return $sce.trustAsHtml(QuizFactory.shareLinks(percentage, $scope.quizName));

			}		

			$scope.retakeQuiz = function(){
				$rootScope.quiz = $scope.quizName;
				$window.location.reload();

				
			}

			


		}]);


})();