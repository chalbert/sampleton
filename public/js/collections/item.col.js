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
      if (model instanceof Backbone.Model) {
        if (!model.get('order')) {
          model.set({order: this.nextOrder()});
        }
      } else if (!model || !model.order) {
        model = model || {};
        model.order = this.nextOrder();
      }
      return Backbone.Collection.prototype.create.call(this, model, options);
    },

    //| > Generates next order
    nextOrder: function() {
      if (!this.length) return 1;
      var order = this.last().get('order');
      return order + 1;
    },

    //| > Used by Backbone to sort by order
    comparator: function(item) {
      return item.get('order');
    },

    //|---------|
    //| HELPERS |
    //|---------|

    filterBy: function(attribute, value){
      var result = this.filter(function(item){
        var search = new RegExp(value, 'i'),
            target = item.get(attribute).toLowerCase();

        return target.match(search);
      });
      return result;
    }

  });
});