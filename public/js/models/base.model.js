define([
  'jquery',
  'underscore',
  'backbone',
  'classes/plugins/underscore-extension'
], function($, _, Backbone){

  return Backbone.Model.extend({

    idAttribute : '_id',

    get: function (attr) {
      if (!attr) return;
      if (attr == 'id') return this.id;
      var property = Backbone.Model.prototype.get.call(this, attr),
          method = this['get' + _.capitalize(attr)];
      if (!property && property !== 0 && typeof method == 'function')
      {
        return method.call(this);
      }

      return property;
    },

    getPosition: function() {
      return this.collection.indexOf(this) + 1;
    }

  });

});