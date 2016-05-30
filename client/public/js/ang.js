var flashCardsApp = angular.module("FlashCards", []);
flashCardsApp.controller("FlashCardsController", ["$scope", "$http", function($scope, $http) {

  $scope.allCards = [];
  $scope.newCard = {
    title: '',
    subject: '',
    question: '',
    answer: ''
  };
  $scope.allTests = [];
  $scope.newTest = '';
  $scope.randomTest= [];

  // ng-show Variables
  $scope.dispCreate = false;
  $scope.dispAllCards = false;
  $scope.dispAllTests = false;
  $scope.dispRandomTest = false;

  $scope.getAllCards = function() {
    $http.get('/api/cards').then(function(response) {
      $scope.allCards = response.data;
      $scope.getAllTests();
      // $scope.getRandomTestCards();
    })
  };
  $scope.getOneCard = function(reqTitle) {
    $http.get('/api/cards/one', { params: { title: reqTitle }}).then(function(response) {
      console.log(response.data[0]);
    });
  };
  $scope.getAllTests = function() {
    $scope.allCards.forEach(function(f) {
      f.tests.forEach(function(t) {
        if ($scope.allTests.indexOf(t) == -1) {
          $scope.allTests.push(t);
        }
      });
    });
  };
  $scope.saveCard = function() {
    var dbCard = {
      card: $scope.newCard
    };
    $http.post('/api/cards', dbCard).then(function(response) {
      $scope.allCards.push(response.data);
    });
  };
  // Edit Flash Card
  $scope.updateCard = function(editedCard) {
    $http.put('/api/cards/' + editedCard._id, { card: editedCard }).then(function(response) {
      console.log("Successful edit");
    });
  };
  // Delete Flash Card by ID, update allCards to filter out deleted Card
  $scope.deleteCard = function(id) {
    $http.delete('/api/cards/' + id).then(function(response) {
      $scope.allCards = $scope.allCards.filter(function(f) {
        return f._id != id;
      });
    });
  };
  $scope.addToTest = function(id) {
    console.log("Attempting to add to test");
    if ($scope.newTest != '') {
      $http.put('/api/cards/test/' + id, { testName: $scope.newTest }).then(function(response) {
        console.log(response);
      });
    }
  };

  $scope.showCreateForm = function() {
    $scope.dispCreate = true;
    $scope.dispAllCards = false;
    $scope.dispAllTests = false;
    $scope.dispRandomTest = false;
  };
  $scope.showAllFlashCards = function() {
    $scope.dispAllCards = true;
    $scope.dispCreate = false;
    $scope.dispAllTests = false;
    $scope.dispRandomTest = false;
  };
  $scope.showAllTests = function() {
    $scope.dispAllTests = true;
    $scope.dispCreate = false;
    $scope.dispAllCards = false;
    $scope.dispRandomTest = false;
  };

  $scope.getRandomTest = function() {
    return $scope.allTests[Math.floor(Math.random() * $scope.allTests.length)];
  };
  $scope.getRandomTestCards = function() {
    $scope.randomTest = [];
    var test = $scope.getRandomTest();
    console.log(test);
    $scope.allCards.forEach(function(f) {
      if (f.tests.indexOf(test) != -1) {
        $scope.randomTest.push(f);
      }
    });

    $scope.dispRandomTest = true;
    $scope.dispCreate = false;
    $scope.dispAllCards = false;
    $scope.dispAllTests = false;
  };

  $scope.getAllCards();
}]);
