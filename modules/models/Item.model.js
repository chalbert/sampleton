var mongoose = require('mongoose'),
    Record = require('./record.model.js');

var Item = new mongoose.Schema({
  title:String,
  records:[Record],
  order:Number
});

Item.virtual('counter').get(function(){
  return this.records.length;
});

module.exports = Item;
