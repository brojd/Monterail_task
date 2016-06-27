var express = require('express');
var serverApp = express();
var bodyParser = require('body-parser');
var http = require('http').Server(serverApp);
var fs = require("fs");


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



/* ROUTES */


serverApp.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

serverApp.get('/getDB', function(req, res) {
    res.sendFile(__dirname + '/database.json');
});

serverApp['put']('/updateQuestion', function(req, res) {
    var file_content = fs.readFileSync('database.json');
    var content = JSON.parse(file_content);
    var getCurrentQuestion = function(idOfQuestion) {
        var lookup = {};
        for (var i = 0; i < content.questions.length; i++) {
            lookup[content.questions[i].id] = content.questions[i];
        };
        return lookup[idOfQuestion];
    };
    getCurrentQuestion(req.query.questionID).upvotes = req.query.upvotes;
    getCurrentQuestion(req.query.questionID).downvotes = req.query.downvotes;
    fs.writeFileSync('database.json', JSON.stringify(content));
});

serverApp['put']('/updateAnswer', function(req, res) {
    var file_content = fs.readFileSync('database.json');
    var content = JSON.parse(file_content);
    var getCurrentAnswer = function(idOfAnswer) {
        var lookup = {};
        for (var i = 0; i < content.answers.length; i++) {
            lookup[content.answers[i].id] = content.answers[i];
        };
        return lookup[idOfAnswer];
    };
    getCurrentAnswer(req.query.answerID).upvotes = req.query.upvotes;
    getCurrentAnswer(req.query.answerID).downvotes = req.query.downvotes;
    fs.writeFileSync('database.json', JSON.stringify(content));
});

serverApp['put']('/updateComment', function(req, res) {
    var file_content = fs.readFileSync('database.json');
    var content = JSON.parse(file_content);
    var getCurrentComment = function(idOfComment) {
        var lookup = {};
        for (var i = 0; i < content.comments.length; i++) {
            lookup[content.comments[i].id] = content.comments[i];
        };
        return lookup[idOfComment];
    };
    getCurrentComment(req.query.commentID).upvotes = req.query.upvotes;
    getCurrentComment(req.query.commentID).downvotes = req.query.downvotes;
    fs.writeFileSync('database.json', JSON.stringify(content));
});


/* RUN SERVER */


serverApp.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, serverApp.settings.env);
});