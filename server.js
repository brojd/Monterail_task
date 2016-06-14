var express = require('express');
var serverApp = express();
var bodyParser = require('body-parser');
var http = require('http').Server(serverApp);
// var manageDB = require('./manageDB.js');


/* CONFIGURATION */


serverApp.use(express.static('public'));
serverApp.use('/scripts/angular/', express.static(__dirname + '/node_modules/angular/'));
serverApp.use('/scripts/angular-route/', express.static(__dirname + '/node_modules/angular-route/'));
serverApp.use('/scripts/angular-css/', express.static(__dirname + '/node_modules/angular-css/'));
serverApp.set('views', __dirname + '/public/views');
serverApp.set('view engine', 'html');
serverApp.engine('html', require('ejs').renderFile);
serverApp.use(bodyParser.urlencoded({ extended: true }));
serverApp.use(bodyParser.json());


/* SERVER ROUTES */



/* FRONTEND ROUTE */


serverApp.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});


/* RUN SERVER */


http.listen(3000, function(){
    console.log('listening on *:3000');
});