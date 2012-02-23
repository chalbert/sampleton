var mongoose = require('mongoose'),
    Project = require('./project.M.js');

var User = mongoose.model('User', new mongoose.Schema({
  role: {type: Number, 'default': 1 },
  email: String,
  name: String,
  password: String,
}));

module.exports = User;