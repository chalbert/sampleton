//|===================================================|
//| COLLECTION ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'models/item.model'
  ], function(_, Backbone, Item){

  return Backbone.Collection.extend({

    model: Item,

    url: '/api/items',

//------------------------------------------------------------------------

    //|---------|
    //| ACTIONS |
    //|---------|

    //| > We override the create function to add the order of not provided
    //|   We Want this on the collection to abstract the model from it
    create: function(model, options){
      if (!model.order) {
        model.order = this.nextOrder();
      }
      Backbone.Collection.prototype.create.call(this, model, options);
    },

    //| > Generates next order
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    //| > Used by Backbone to sort by order
    comparator: function(item) {
      return item.get('order');
    }

  });
});