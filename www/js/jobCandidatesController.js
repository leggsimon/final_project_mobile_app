seekr.controller('jobCandidatesCtrl', ['$scope', '$http', '$stateParams', 'Restangular', function($scope, $http, $stateParams, Restangular) {
  var api = Restangular.all('jobseekers');
  var url = 'http://tranquil-peak-9751.herokuapp.com/api';

  var jobseekerData = api.getList().then(function(result){
      $scope.jobseekers = result;
  });


  $scope.addCard = function(i) {
    var newCard = jobseekerData[Math.floor(Math.random() * jobseekerData.length)];
    newCard.id = Math.random();
    $scope.jobseekers.push(angular.extend({}, newCard));
  };

  for (var i = 0; i < jobseekerData.length; i++) $scope.addCard();

  $scope.cardSwipedLeft = function(id) {
    reject(id);
    console.log('Left swipe');
  };

  $scope.cardSwipedRight = function(id) {
    $scope.jobseekers.push(angular.extend({}, id));
    console.log('Right swipe');
    console.log('Card put back in candidates');
  };

  var reject = function(id) {
    $http.post(url + '/offers', {
      'job_id': $scope.jobInfo.id,
      'job_seeker_id': id,
      'accepted': false,
      }).success(function(data, status, headers, config) {
        console.log('data inserted succesfully');
      });
  };

  $scope.offer = function(id) {
    $http.post(url + '/offers', {
      'job_id': $scope.jobInfo.id,
      'job_seeker_id': id,
      'accepted': true,
      }).success(function(data, status, headers, config) {
        console.log('data inserted succesfully');
      });
  };

}]);
