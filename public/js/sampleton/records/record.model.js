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
        created_at: new Date()
      };
    },

    getCreated_at_string: function(){
      return new Date(this.get('created_at')).toString('dddd, MMMM, d, yyyy');
    }

  });
});