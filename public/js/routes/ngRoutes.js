app.config(function($routeProvider) {
    
    $routeProvider.
    
    when('/', {
        templateUrl: '../../views/allQuestions.html',
        controller: 'AllQuestionsCtrl',
        css: ['../../css/main.css', '../../css/all.css', '../../css/profileModal.css',
              '../../css/allMediaQueries.css', '../../css/profileModalMediaQueries.css']
    }).
    
    when('/question/:questionID', {
        templateUrl: '../../views/singleQuestion.html',
        controller: 'SingleQuestionCtrl',
        css: ['../../css/main.css', '../../css/single.css', '../../css/profileModal.css',
              '../../css/singleMediaQueries.css', '../../css/profileModalMediaQueries.css']
    });
        
});