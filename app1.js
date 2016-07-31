var express = require('express');
var application = require('./app.js');
var db = require('./db.js');


var app = express();

// Serve the Parse API on the /parse URL prefix
app.use(express.static("./public"));
app.use('/rlquiz', application);

// Listen for connections on port 1337
var PORT =  1338;
db.sequelize.sync().then(function() {
        app.listen(PORT, function() {
                console.log('Express listening on port ' + PORT + '!');
        });
});

