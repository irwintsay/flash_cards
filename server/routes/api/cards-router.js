var express     = require("express"),
    path        = require("path"),
    cardsRouter = express.Router();

var Card        = require("../../models/card.js");

cardsRouter.get('/', function(req, res) {
  Card.find(function(error, response) {
    res.json(response);
  });
});

cardsRouter.post('/', function(req, res) {
  console.log(req.body);
  Card.create(req.body.card, function(error, response) {
    if (error) {
      console.log("Error saving card" + error);
    } else {
      res.json(response);
    }
  })
});

module.exports = cardsRouter;
