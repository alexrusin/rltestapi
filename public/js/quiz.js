(function(){

	var app = angular.module('myQuiz',[]);
	app.controller('QuizController', ['$scope', '$http', '$sce', function($scope, $http, $sce){

			$scope.score = 0;
			$scope.activeQuestion = -1;
			$scope.activeQuestionAnswer = 0;
			$scope.percentage = 0;

			$http.get('quiz_data.json').then(function(quizData){
				$scope.myQuestions = quizData.data;
				$scope.myQuestions = shuffleSlice($scope.myQuestions);
				$scope.totalQuestions = $scope.myQuestions.length;
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
				var url = 'https://rusin-barqz.herokuapp.com';
				var emailLink = '<a class="btn email" href="mailto:?subject=Try to beat my quiz score!&amp;body=I scored '+percentage+'% on this quiz. Try to beat my score at '+url+'">Email a freind</a>';
				var twitterLink = '<a class="btn twitter" target = "_blank" href="http://twitter.com/share?text=I scored '+percentage+' on this quiz. Try to beat my score at&hashTags=BarQuiz&url='+url+'">Tweet your score</a>';
				
				var newMarkup = emailLink + twitterLink;

				return $sce.trustAsHtml(newMarkup);

			}	

			function shuffleSlice(array) {
  				var currentIndex = array.length, temporaryValue, randomIndex;

  				// While there remain elements to shuffle...
  				while (0 !== currentIndex) {

    			// Pick a remaining element...
			    randomIndex = Math.floor(Math.random() * currentIndex);
			    currentIndex -= 1;

			    // And swap it with the current element.
			    temporaryValue = array[currentIndex];
			    array[currentIndex] = array[randomIndex];
			    array[randomIndex] = temporaryValue;
			  	}

			  return array.slice(0, 14);
			}


		}]);


})();