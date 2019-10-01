const mongoose = require('mongoose');

const schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId
  },
  game: { type: Object, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('games', schema);
