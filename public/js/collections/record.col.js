//|===================================================|
//| COLLECTION ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'models/record.model'
], function(_, Backbone, Record){

  return Backbone.Collection.extend({

    model: Record,

    initialize: function(records, options){
      this.item = options.item;
      this.url = '/api/records/' + this.item.id;
    },

//------------------------------------------------------------------------

    //|---------|
    //| ACTIONS |
    //|---------|

    //| > Used by Backbone to sort by order
    comparator: function(item) {
      return item.get('date');
    }

  });
});