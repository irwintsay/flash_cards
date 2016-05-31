var flashCardsApp = angular.module("FlashCards", []);
flashCardsApp.controller("FlashCardsController", ["$scope", "$http", function($scope, $http) {

  $scope.allCards = [];
  $scope.newCard = {
    title: '',
    subject: '',
    question: '',
    answer: '',
    tests: []
  };
  $scope.allTests = [];
  $scope.newTest = '';

  $scope.currentTest = '';
  $scope.currentTestCards = [];

  // ng-show Variables
  $scope.dispCreate = false;
  $scope.dispAllCards = false;
  $scope.dispAllTests = false;
  $scope.dispRandomTest = false;
  $scope.dispUpdateForm = false;
  $scope.dispRunTest = false;

  $scope.clearVars = function() {
    $scope.newCard = {
      title: '',
      subject: '',
      question: '',
      answer: '',
      tests: []
    };
    $scope.newTest = '';
  };
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
    $scope.allTests = [];
    $scope.allCards.forEach(function(f) {
      f.tests.forEach(function(t) {
        if ($scope.allTests.indexOf(t) == -1) {
          $scope.allTests.push(t);
        }
      });
    });
  };
  // Add New Flash Card
  $scope.saveCard = function() {
    $scope.newCard.tests.push($scope.newTest);
    var dbCard = {
      card: $scope.newCard
    };
    console.log($scope.newTest);
    $http.post('/api/cards', dbCard).then(function(response) {
      $scope.allCards.push(response.data);
      $scope.clearVars();
      $scope.showAllFlashCards();
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
  $scope.addToTest = function(card, id) {
    console.log("Attempting to add to test");
    if ($scope.newTest != '' && card.tests.indexOf($scope.newTest) == -1) {
      $http.put('/api/cards/test/' + id, { testName: $scope.newTest }).then(function(response) {
        console.log(response);
      });
    }
  };

  $scope.showCreateForm = function() {
    $scope.dispCreate = true;
    $scope.dispAllCards = false;
    $scope.dispAllTests = false;
    $scope.dispUpdateForm = false;
    $scope.dispRunTest = false;
  };
  $scope.showAllFlashCards = function() {
    $scope.dispAllCards = true;
    $scope.dispCreate = false;
    $scope.dispAllTests = false;
    $scope.dispUpdateForm = false;
    $scope.dispRunTest = false;
  };
  $scope.showAllTests = function() {
    $scope.getAllCards();
    $scope.dispAllTests = true;
    $scope.dispCreate = false;
    $scope.dispAllCards = false;
    $scope.dispUpdateForm = false;
    $scope.dispRunTest = false;
  };

  $scope.getRandomTest = function() {
    return $scope.allTests[Math.floor(Math.random() * $scope.allTests.length)];
  };
  $scope.getCurrentTestCards = function(test) {
    $scope.currentTestCards = [];
    $scope.allCards.forEach(function(f) {
      if (f.tests.indexOf(test) != -1) {
        $scope.currentTestCards.push(f);
      }
    });
  };
  $scope.runTest = function(test) {
    $scope.currentTest = test;
    $scope.getCurrentTestCards(test);

    $scope.dispAllTests = false;
    $scope.dispCreate = false;
    $scope.dispAllCards = false;
    $scope.dispUpdateForm = false;
    $scope.dispRunTest = true;
  };

  $scope.getAllCards();
}]);
