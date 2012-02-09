//|===================================================|
//| GLASSES MODEL | o_o.model
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'libs/glasses/glasses.util'
], function($, _, Backbone, util){

  return Backbone.Model.extend({

    idAttribute : '_id',

    get: function (attr) {
      var property = Backbone.Model.prototype.get.call(this, attr),
          method = this['get' + util.capitalize(attr)];
      if (!property && typeof method == 'function')
      {
        return method.call(this);
      }

      return property;
    }

  });

});