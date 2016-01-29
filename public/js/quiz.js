(function(){

	var app = angular.module('myQuiz',['ngRoute']);

	app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'SelectQuizController',
                templateUrl: 'views/selectquiz.html'
            })
            .when('/quiz', {
                controller: 'QuizController',
                templateUrl: 'views/quiz.html'
            })
            .otherwise( { redirectTo: '/' } );
    });
	


})();