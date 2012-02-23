var mongoose = require('mongoose'),
    Item = require('./item.M.js');

var Project = mongoose.model('Project', new mongoose.Schema({
  owner: mongoose.Schema.ObjectId,
  title: {type: String, 'default': 'New project'},
  items: [Item],
  order: Number,
  created_at: { type: Date, 'default': Date.now }
}));

module.exports = Project;
