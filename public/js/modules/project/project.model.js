//|===================================================|
//| MODEL ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'models/base.model',
  'modules/records/record.col'
], function(_, Backbone, baseModel, RecordCol){

  return baseModel.extend({

    defaults: function() {
      return {
        title: ''
      }
    },

    configure: function(projectId){
      this.url = 'api/projects/' + projectId;
    }

  });
});