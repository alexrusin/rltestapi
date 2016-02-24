(function(){

	var app = angular.module('myQuiz',['ngRoute', 'textAngular']);

	app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'SelectQuizController',
                templateUrl: 'views/selectquiz.html'
            })
            .when('/quiz/:quizId/:quizName', {
                controller: 'QuizController',
                templateUrl: 'views/quiz.html'
            })
            .when('/tipshare', {
                controller: 'FormController',
                templateUrl: 'views/tipshareform.html'
            })
            .otherwise( { redirectTo: '/' } );
    });
	


})();