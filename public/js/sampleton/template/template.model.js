//|===================================================|
//| MODEL ~ ITEM
//|===================================================|
define([
  'underscore-extended',
  'backbone-extended'
], function(_, Backbone){

  return Backbone.Model.extend({

    defaults: function() {
      return {
        title: '',
        fields: []
      }
    },

    url: 'api/templates/:template'

  });
});