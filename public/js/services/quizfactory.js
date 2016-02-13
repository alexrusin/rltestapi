(function() {
	angular.module('myQuiz').factory('QuizFactory', ['$http',
		function($http) {
			var factory = {};
			factory.getQuestions = function(whichquiz, callback) {
				$http.get(whichquiz + '.json').success(function(quizData){
				var myQuestions = shuffleSlice(quizData);
				return callback(myQuestions);
			}).error(function(err){
				return callback('error');
			});

			}

			function shuffleSlice(array) {
				var currentIndex = array.length,
					temporaryValue, randomIndex;

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

				if (array.length > 20) {
					array = array.slice(0, 20);
				}

				return array;
			}

			return factory;
		}
	]);

}());