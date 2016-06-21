app.controller('AllQuestionsCtrl', function(DatabaseService, $scope, ngDialog) {
    
    DatabaseService.getJSON().then(angular.bind(this, function(serverDatabase) {
        this.questions = serverDatabase.data.questions;
        this.comments = serverDatabase.data.comments;
        this.users = serverDatabase.data.users;
        this.answers = serverDatabase.data.answers;
        
        this.getCurrentUser = angular.bind(this, function(idOfUser) {
            var lookup = {};
            for (var i = 0; i < this.users.length; i++) {
                lookup[this.users[i].id] = this.users[i];
            };
            return lookup[idOfUser];
        });
    }));
    
    this.countMoreActivities = angular.bind(this, function(currentQuestion) {
        var nbOfActivities = currentQuestion.nbOfComments + currentQuestion.nbOfAnswers;
        if (nbOfActivities > 5) {
            this.displayMore = true;
        } else {
            this.displayMore = false;
        }
        return nbOfActivities - 4;
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
    
});