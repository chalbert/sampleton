//|===================================================|
//| MODEL ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'glasses'
], function(_, Backbone, o_o){

  return o_o.model.extend({

    defaults: function() {
      return {
        date: new Date()
      };
    },

    initialize: function(){
      if (!_.isDate(this.get('date'))) {
        this.set('date', new Date(this.get('date')));
      }
    }
    

  });
});