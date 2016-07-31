var Sequelize = require('sequelize');

var sequelize = new Sequelize('quiz', 'quiz', 'Password', {
	host: 'lc',
	dialect: 'mysql',
});

var db = {};

db.quiz = sequelize.import(__dirname + '/models/quiz.js');
db.question = sequelize.import(__dirname + '/models/question.js');
db.answer = sequelize.import(__dirname + '/models/answer.js');
db.tipshare = sequelize.import(__dirname + '/models/tipshare.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.question.belongsTo(db.quiz);
db.quiz.hasMany(db.question);

db.answer.belongsTo(db.question);
db.question.hasMany(db.answer);

module.exports = db;