//|===================================================|
//| BASE COLLECTION
//|===================================================|
define([
  'underscore',
  'backbone'
], function(_, Backbone, Project){

  return Backbone.Collection.extend({

    next: function(model) {
      var i = this.at(this.indexOf(model));
      if (undefined === i || i < 0) return false;
      return this.at(this.indexOf(model) + 1);
    },

    previvous: function(model) {
      if (undefined === i || i < 1) return false;
      return this.at(this.indexOf(model) - 1);
    }

  });
});
