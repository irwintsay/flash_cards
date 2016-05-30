var flashCardsApp = angular.module("FlashCards", []);
flashCardsApp.controller("FlashCardsController", ["$scope", "$http", function($scope, $http) {

  $scope.allCards = [];
  $scope.newCard = {
    title: '',
    subject: '',
    question: '',
    answer: ''
  };

  $scope.getAllCards = function() {
    $http.get('/api/cards').then(function(response) {
      $scope.allCards = response.data;
    })
  }
  $scope.saveCard = function() {
    var dbCard = {
      card: $scope.newCard
    }
    $http.post('/api/cards', dbCard).then(function(response) {
      console.log(response);
    })
  }

  $scope.getAllCards();
}]);
