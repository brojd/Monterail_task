app.controller('AllQuestionsCtrl', function(DatabaseService) {
    
    DatabaseService.getJSON().then(angular.bind(this, function(serverDatabase) {
        this.questions = serverDatabase.data.questions;
        this.comments = serverDatabase.data.comments;
        this.users = serverDatabase.data.users;
    }));
    
    this.getCurrentUser = angular.bind(this, function(idOfUser) {
        var lookup = {};
        for (var i = 0; i < this.users.length; i++) {
            lookup[this.users[i].id] = this.users[i];
        };
        return lookup[idOfUser];
    });
    
    this.countMoreActivities = angular.bind(this, function(currentQuestion) {
        var nbOfActivities = currentQuestion.nbOfComments + currentQuestion.answer.length;
        if (nbOfActivities > 5) {
            this.displayMore = true;
        } else {
            this.displayMore = false;
        }
        return nbOfActivities - 4;
    });
    
});