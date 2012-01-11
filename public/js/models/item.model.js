//|===================================================|
//| MODEL ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone'
  ], function(_, Backbone){

  return Backbone.Model.extend({

    idAttribute : '_id',

    defaults: function() {
      return {
        title: '',
        counter:  0,
        order: 0
      };
    },

    //| > Increment counter
    increment: function() {
      this.save({counter: this.get("counter") + 1});
    }

  });
});