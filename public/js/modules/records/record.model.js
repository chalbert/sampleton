//|===================================================|
//| MODEL ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'models/base.model'
], function(_, Backbone, baseModel){

  return baseModel.extend({

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