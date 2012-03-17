//|===================================================|
//| MODEL ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone'
], function(_, Backbone){

  return Backbone.Model.extend({

    defaults: function() {
      return {
        title: ''
      }
    },

    url: 'api/projects/:project'

  });
});