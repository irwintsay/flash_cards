var mongoose = require("mongoose");

var cardSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  tests: [{
    type: String
  }],
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model("Card", cardSchema);
