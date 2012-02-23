//|===================================================|
//| MODEL ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'models/base.model'
], function(_, Backbone, baseModel){

  return baseModel.extend({

    defaults: function() {
      return {
        title: '',
        previous: undefined,
        next: undefined
      };
    },

    configure: function(projectId, itemId){
      this.url = '/api/projects/' + projectId + '/items/' + itemId;
    }

  });
});