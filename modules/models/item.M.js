var mongoose = require('mongoose'),
    Record = require('./record.M.js');

var Item = new mongoose.Schema({
  title:String,
  records:[Record],
  order:Number,
  image: Buffer
});

Item.virtual('counter').get(function(){
  return this.records.length;
});

module.exports = Item;
