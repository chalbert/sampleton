//|===================================================|
//| COLLECTION ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'models/item.model'
  ], function(_, Backbone, Item){

	var ItemsCollection = Backbone.Collection.extend({

  model: Item,

  url: '/api/items',

  //| > Generates next order
  nextOrder: function() {
    if (!this.length) return 1;
    return this.last().get('order') + 1;
  },

  // Items are sorted by their original insertion order.
  comparator: function(item) {
    return item.get('order');
  }

  });
  return new ItemsCollection;
});