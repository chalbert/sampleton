//|===================================================|
//| COLLECTION ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'sampleton/records/record.model'
], function(_, Backbone, recordModel){

  return Backbone.Collection.extend({

    model: recordModel,

    //| > Used by Backbone to sort by order
    comparator: function(item) {
      return item.get('created_at');
    },

    url: 'api/projects/:project/items/:item/records'

  });
});