var express = require("express");
var cors = require("cors");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(function(req, res, next){
	console.log(`${req.method} request for '${req.url}'`);
	next();
});

app.use(cors());

app.use(express.static("./public"));

app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});

module.exports = app;