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

//    url: '/api/records',

    initialize: function(records, options){
      this.url = '/api/records/' + options.item;
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