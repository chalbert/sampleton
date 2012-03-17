//|===================================================|
//| MODEL ~ FIELD
//|===================================================|
define([
  'underscore',
  'backbone'
], function(_, Backbone){

  return Backbone.Model.extend({

    defaults: function() {
      return {
        title: '',
        options:  [],
        order: 0
      };
    }

  });
});