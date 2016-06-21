app.controller('ProfileModalCtrl', function($scope, clickedUser, DatabaseService) {
    
    DatabaseService.getJSON().then(function(serverDatabase) {
        $scope.users = serverDatabase.data.users;
        $scope.questions = serverDatabase.data.questions;
    });    
    
    $scope.clickedUser = clickedUser;
    
    $scope.monthsAgo = function() {
        var joinDate = new Date($scope.clickedUser.date_of_join);
        var currentDate = new Date();
        var months = (currentDate - joinDate) / (1000 * 60 * 60 * 24 * 365.25 / 12);
        return Math.floor(months);
    };
    
    $scope.lastVisit = function() {
        var dateOfVisit = new Date($scope.clickedUser.last_log);
        var currentDate = new Date();
        var daysAgo = Math.floor((currentDate - dateOfVisit) / (1000 * 60 * 60 * 24));
        var result;
        if (daysAgo < 7) {
            switch (dateOfVisit.getDay()) {
                case 0:
                    result = "Sunday ";
                    break;
                case 1:
                    result = "Monday ";
                    break;
                case 2:
                    result = "Tuesday ";
                    break;
                case 3:
                    result = "Wednesday ";
                    break;
                case 4:
                    result = "Thursday ";
                    break;
                case 5:
                    result = "Friday ";
                    break;
                case 6:
                    result = "Saturday ";
            }
            if (dateOfVisit.getHours() >= 6 && dateOfVisit.getHours() < 12) {
                result += 'morning';
            } else if (dateOfVisit.getHours() >= 13 && dateOfVisit.getHours() < 18) {
                result += 'afternoon';
            } else if (dateOfVisit.getHours() >= 19 && dateOfVisit.getHours() < 24) {
                result += 'evening';
            } else if (dateOfVisit.getHours() >= 0 && dateOfVisit.getHours() < 6) {
                result += 'night';
            }
        } else {
            result = dateOfVisit.toLocaleDateString();
        }
        return result;
    }
    
    $scope.activityLevel = function() {
        result = {};
        if (clickedUser.activity_level === 0) {
            result.firstOn = false;
            result.secondOn = false;
            result.thirdOn = false;
        } else if (clickedUser.activity_level == 1) {
            result.firstOn = true;
            result.secondOn = false;
            result.thirdOn = false;
        } else if (clickedUser.activity_level == 2) {
            result.firstOn = true;
            result.secondOn = true;
            result.thirdOn = false;
        } else if (clickedUser.activity_level == 3) {
            result.firstOn = true;
            result.secondOn = true;
            result.thirdOn = true;
        }
        return result;
    }
    
    $scope.joinedSamePeriod = function() {
        var initialDate = new Date($scope.clickedUser.date_of_join);
        var endPeriod = new Date(initialDate.setMonth(initialDate.getMonth() + 6));
        var startPeriod = new Date(initialDate.setMonth(initialDate.getMonth() - 12));
        var selectedUsers = [];
        angular.forEach($scope.users, function(user, index) {
            var userDate = new Date($scope.users[index].date_of_join);
            if (userDate > startPeriod && userDate < endPeriod) {
                selectedUsers.push($scope.users[index]);
            }
        });
        return selectedUsers;
    };
    
    $scope.hottestDiscussion = function() {
        var initialDate = new Date($scope.clickedUser.date_of_join);
        var endPeriod = new Date(initialDate.setMonth(initialDate.getMonth() + 6));
        var startPeriod = new Date(initialDate.setMonth(initialDate.getMonth() - 12));
        var selectedDiscussions = [];
        angular.forEach($scope.questions, function(question, index) {
            var questionDate = new Date($scope.questions[index].date);
            if (questionDate > startPeriod && questionDate < endPeriod) {
                selectedDiscussions.push($scope.questions[index]);
            }
        });
        function compare(a, b) {
            if (a.conversations > b.conversations)
              return -1;
            if (a.conversations < b.conversations)
              return 1;
            return 0;
          }
        return selectedDiscussions.sort(compare)[0];
    }
    
    $scope.getUser = function(idOfUser) {
        var lookup = {};
        angular.forEach($scope.users, function(user, index) {
            lookup[$scope.users[index].id] = $scope.users[index];
        });
        return lookup[idOfUser];
    };
    
});