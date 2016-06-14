app.service('DatabaseService', function($http) {
    
    this.getJSON = function() {
        return $http({
            method: 'GET',
            url: '/getDB',
        });
    };
    
});