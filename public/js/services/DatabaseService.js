app.service('DatabaseService', function($http) {
    
    this.getJSON = function() {
        return $http({
            method: 'GET',
            url: '/getDB',
        });
    };
    
    this.updateQuestion = function(question) {
        return $http({
            method: 'PUT',
            url: '/updateQuestion',
            params: {'question': question,
                     'questionID': question.id,
                     'upvotes': question.upvotes,
                     'downvotes': question.downvotes}
        });
    };
    
    this.updateAnswer = function(answer) {
        return $http({
            method: 'PUT',
            url: '/updateAnswer',
            params: {'answer': answer,
                     'answerID': answer.id,
                     'upvotes': answer.upvotes,
                     'downvotes': answer.downvotes}
        });
    };
    
    this.updateComment = function(comment) {
        return $http({
            method: 'PUT',
            url: '/updateComment',
            params: {'comment': comment,
                     'commentID': comment.id,
                     'upvotes': comment.upvotes,
                     'downvotes': comment.downvotes}
        });
    };
    
});