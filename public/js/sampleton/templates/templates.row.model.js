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
    },

    getCreated_at_string: function(){
      return new Date(this.get('created_at')).toString('dddd, MMMM, d, yyyy');
    }

  });

});