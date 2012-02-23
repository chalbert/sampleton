var mongoose = require('mongoose');

var Record = new mongoose.Schema({
  created_at: { type: Date, 'default': Date.now }
});

module.exports = Record;

