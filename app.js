var express = require("express");
var cors = require("cors");
var _ = require("underscore");
var bodyParser = require("body-parser");
var db = require("./db.js");

var app = express();
var PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}'`);
	next();
});

app.use(express.static("./public"));

app.post('/api/quizes', function(req, res) {
	var body = _.pick(req.body, 'name', 'active');
	db.quiz.create(body).then(function(quiz) {
		res.json(quiz.toJSON());
	}).catch(function(e) {
		res.status(400).json(e);
	});
});

app.get('/api/quizes', function(req, res) {
	var quizes = [];
	db.quiz.findAll({
		where: {
			active: true
		}
	}).then(function(items) {
		items.forEach(function(item) {
			quizes.push(item);
		});
		res.status(200).json(quizes);
	}).catch(function(e) {
		res.status(400).json(e);
	});


});

app.get('/api/quizes/:id', function(req, res) {
	var qzquestions = [];
	var qzquestion;
	var qzanswers;
	var qzanswer;
	var counter;
	var quizId = parseInt(req.params.id, 10);
	db.quiz.findById(quizId).then(function(quiz) {

		quiz.getQuestions().then(function(questions) {
			questionCounter=0;
			questions.forEach(function(question) {
				
				question.getAnswers().then(function(answers) {
					qzquestion = {};
					qzquestion.correct = null;
					qzanswers = [];
					counter = 0;
					
					answers.forEach(function(answer) {

						qzanswer = {};
						qzanswer.id = counter;
						qzanswer.text = answer.text;

						if (answer.correct) {
							qzquestion.correct = counter;
						}
						qzanswers.push(qzanswer);
						counter++;


					});
					qzquestion.question = question.text;
					qzquestion.feedback = question.feedback;
					qzquestion.answers = qzanswers;

					qzquestions.push(qzquestion);
					questionCounter ++;
					if(questionCounter===questions.length){
					
					return qzquestions;
					}

				}).then(function(qzquestions){

				 	if (typeof qzquestions !== 'undefined'){
				 	res.status(200).json(qzquestions);
				 	}
				
				});

			});

		});
	});

});

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});



module.exports = app;