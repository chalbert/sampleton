//|===================================================|
//| COLLECTION ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'collections/baseCollection.col',
  'modules/records/record.model'
], function(_, Backbone, baseCollection, Record){

  return baseCollection.extend({

    model: Record,

    configure: function(projectId, itemId){
      this.url = '/api/projects/' + projectId + '/items/' + itemId + '/records';
      this.project = projectId;
      this.item = itemId;
    },

    //| > Used by Backbone to sort by order
    comparator: function(item) {
      return item.get('created_at');
    }

  });
});