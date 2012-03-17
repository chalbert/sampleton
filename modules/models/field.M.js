var mongoose = require('mongoose');

var Field = new mongoose.Schema({
  title: { type: String, 'default': '' },
  order: { type: Number, 'default': 0 },
  type: { type: String, 'default': 'text' },
  options: {},
  created_at: { type: Date, 'default': Date.now }
});

module.exports = Field;

