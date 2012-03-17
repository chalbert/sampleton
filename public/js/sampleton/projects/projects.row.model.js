//|===================================================|
//| MODEL ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'date'
], function(_, Backbone){

  return Backbone.Model.extend({

    defaults: function() {
      return {
        title: '',
        order: 0,
        created_at: new Date()
      };
    }

  });

});