const mongoose = require('mongoose');

const schema = mongoose.Schema({
  user: {
    type: String
  },
  game: { type: Object, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('games', schema);
