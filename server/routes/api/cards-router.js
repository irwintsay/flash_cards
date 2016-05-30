var express     = require("express"),
    path        = require("path"),
    cardsRouter = express.Router();

var Card        = require("../../models/card.js");

cardsRouter.get('/', function(req, res) {
  Card.find(function(error, response) {
    res.json(response);
  });
});

cardsRouter.get('/one', function(req, res) {
  console.log(req.query);
  Card.find(req.query, function(error, response) {
    res.json(response);
  });
});

cardsRouter.post('/', function(req, res) {
  Card.create(req.body.card, function(error, response) {
    if (error) {
      console.log("Error saving card" + error);
    } else {
      res.json(response);
    }
  });
});

cardsRouter.put('/:id', function(req, res) {
  console.log(req.body);
  Card.findByIdAndUpdate(req.params.id, req.body.card, function(error, response) {
    if (error) {
      console.log("Error updating card" + error);
    } else {
      res.json(response);
    }
  });
});

cardsRouter.put('/test/:id', function(req, res) {
  console.log(req.body);
  Card.findByIdAndUpdate(req.params.id, { $push: {"tests": req.body.testName} }, function(error, response) {
    res.json(response);
  });

});

cardsRouter.delete('/:id', function(req, res) {
  Card.findByIdAndRemove(req.params.id, function(error, response) {
    if (error) {
      console.log("Error deleting card: " + error);
    } else {
      console.log("Successfully deleted: " + response);
      res.json(response);
    }
  });
});

module.exports = cardsRouter;
