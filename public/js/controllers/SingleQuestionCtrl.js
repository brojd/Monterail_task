app.controller('SingleQuestionCtrl', function(DatabaseService, $scope, $routeParams, $controller, ngDialog) {
    
    DatabaseService.getJSON().then(angular.bind(this, function(serverDatabase) {
        this.questions = serverDatabase.data.questions;
        this.comments = serverDatabase.data.comments;
        this.users = serverDatabase.data.users;
        this.answers = serverDatabase.data.answers;
        this.answers.sort(function (a, b) {
            var aDate = new Date(a.date).getTime();
            var bDate = new Date(b.date).getTime();          
            if (aDate < bDate) {
                return 1;
            }
        });
        
        this.getCurrentUser = angular.bind(this, function(idOfUser) {
            var lookup = {};
            for (var i = 0; i < this.users.length; i++) {
                lookup[this.users[i].id] = this.users[i];
            };
            return lookup[idOfUser];
        });
        
        this.getCurrentQuestion = angular.bind(this, function(idOfQuestion) {
            var lookup = {};
            for (var i = 0; i < this.questions.length; i++) {
                lookup[this.questions[i].id] = this.questions[i];
            };
            return lookup[idOfQuestion];
        });
        
        this.getCurrentAnswer = angular.bind(this, function(idOfAnswer) {
            var lookup = {};
            for (var i = 0; i < this.answers.length; i++) {
                lookup[this.answers[i].id] = this.answers[i];
            };
            return lookup[idOfAnswer];
        });
        
        this.getCurrentComment = angular.bind(this, function(idOfComment) {
            var lookup = {};
            for (var i = 0; i < this.comments.length; i++) {
                lookup[this.comments[i].id] = this.comments[i];
            };
            return lookup[idOfComment];
        });
        
        this.currentQuestion = this.getCurrentQuestion($routeParams.questionID);
        this.currentUserID = this.currentQuestion.owner_id;
        this.currentUser = this.getCurrentUser(this.currentQuestion.owner_id);
        this.lastAnsweredUser = this.getCurrentUser(this.answers[0].owner_id);
        
        this.lastDiscussion = function() {
            var lastDiscussionDate = new Date(this.currentQuestion.last_time_discussed);
            var currentDate = new Date();
            var daysAgo = (currentDate - lastDiscussionDate) / (1000 * 60 * 60 * 24);
            var result = (daysAgo === 1) ? "yesterday" : Math.floor(daysAgo);
            return result;
        }
        
        this.daysAgoAnswered = function(answer) {
            var answerDate = new Date(answer.date);
            var currentDate = new Date();
            var daysAgo = (currentDate - answerDate) / (1000 * 60 * 60 * 24);
            var result = (daysAgo === 1) ? "yesterday" : (Math.floor(daysAgo) + " days ago");
            return result;
        }
        
        this.countAnswers = angular.bind(this, function(currentQuestion) {
            var allAnswersComments = currentQuestion.nbOfComments + currentQuestion.nbOfAnswers;
            return allAnswersComments;
        });
        
        this.increaseQuestionUpvotes = angular.bind(this, function(idOfQuestion) {
            this.getCurrentQuestion(idOfQuestion).upvotes = Number(this.currentQuestion.upvotes);
            this.getCurrentQuestion(idOfQuestion).upvotes += 1;
            DatabaseService.updateQuestion(this.currentQuestion);
        });
        
        this.increaseQuestionDownvotes = angular.bind(this, function(idOfQuestion) {
            this.getCurrentQuestion(idOfQuestion).downvotes = Number(this.currentQuestion.downvotes);
            this.getCurrentQuestion(idOfQuestion).downvotes += 1;
            DatabaseService.updateQuestion(this.currentQuestion);
        });
        
        this.increaseAnswerUpvotes = angular.bind(this, function(idOfAnswer) {
            this.getCurrentAnswer(idOfAnswer).upvotes = Number(this.getCurrentAnswer(idOfAnswer).upvotes);
            this.getCurrentAnswer(idOfAnswer).upvotes += 1;
            DatabaseService.updateAnswer(this.getCurrentAnswer(idOfAnswer));
        });
        
        this.increaseAnswerDownvotes = angular.bind(this, function(idOfQuestion) {
            this.getCurrentAnswer(idOfAnswer).downvotes = Number(this.getCurrentAnswer(idOfAnswer).downvotes);
            this.getCurrentAnswer(idOfAnswer).downvotes += 1;
            DatabaseService.updateAnswer(this.getCurrentAnswer(idOfAnswer));
        });
        
        this.increaseCommentUpvotes = angular.bind(this, function(idOfComment) {
            this.getCurrentComment(idOfComment).upvotes = Number(this.getCurrentComment(idOfComment).upvotes);
            this.getCurrentComment(idOfComment).upvotes += 1;
            DatabaseService.updateComment(this.getCurrentComment(idOfComment));
        });
        
        this.increaseCommentDownvotes = angular.bind(this, function(idOfComment) {
            this.getCurrentComment(idOfComment).downvotes = Number(this.getCurrentComment(idOfComment).downvotes);
            this.getCurrentComment(idOfComment).downvotes += 1;
            DatabaseService.updateComment(this.getCurrentComment(idOfComment));
        });
        
        /* Enable modal */
        
        this.openModal = function($event) {
            $scope.clickedUser = this.getCurrentUser($event.target.id);
            ngDialog.open({
                template: '../../views/modalProfile.html',
                className: 'ngdialog-theme-default',
                scope: $scope,
                resolve: {
                    clickedUser: function depFactory() {
                        return $scope.clickedUser;
                    }
                },
                controller: 'ProfileModalCtrl'
            });
        };
        
    }));
});