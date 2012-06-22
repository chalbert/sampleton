//|===================================================|
//| MODEL ~ FIELD
//|===================================================|
define([
  'underscore-extended',
  'backbone-extended'
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