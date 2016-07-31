(function() {
	angular.module('myQuiz').factory('QuizFactory', ['$http', 
		function($http) {
			var factory = {};
			
			factory.getQuizData = function(apicall, callback) {
				$http.get(apicall).success(function(quizData){
				
				return callback(quizData);
			}).error(function(){
				return callback('error');
			});

			}

			factory.shuffleSlice = function(array) {
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

			factory.shareLinks = function(percentage, quizName){

				var url = 'http://myapi.website/rlquiz';
				//var emailLink = '<a class="btn email" href="mailto:?subject=Try to beat my quiz score!&amp;body=I scored '+percentage+'% on this quiz. Try to beat my score at '+url+'">Email</a>';
				var twitterLink = '<a class="btn twitter" target = "_blank" href="http://twitter.com/share?text=I scored '+percentage+'% on '+quizName+' quiz. Try to beat my score at&hashTags=BarQuiz&url='+url+'">Tweet your score</a>';
				var facebookLink = '<a class="btn facebook" target = "_blank" href="https://www.facebook.com/sharer/sharer.php?u='+url+'">Share on Facebook</a>';;
				var newMarkup = twitterLink + facebookLink;
					
				return newMarkup;

			}

			return factory;
		}
	]);

}());
