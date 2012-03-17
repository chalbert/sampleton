var mongoose = require('mongoose'),
    Field = require('./field.M.js');

var Template = mongoose.model('Template', new mongoose.Schema({
  owner: mongoose.Schema.ObjectId,
  title: {type: String, 'default': 'New title'},
  order: Number,
  fields: [Field],
  created_at: { type: Date, 'default': Date.now }
}));

module.exports = Template;
