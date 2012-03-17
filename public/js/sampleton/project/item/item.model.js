//|===================================================|
//| MODEL ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone'
], function(_, Backbone){

  return Backbone.Model.extend({

    defaults: function() {
      return {
        title: '',
        records:  [],
        order: 0
      };
    },

    initialize: function(){
      this.counter = this.get('counter');
      this.unset('counter');
    },

    getCounter: function() {
      var length = (this.counter || 0) + (this.get('records') || []).length;
      return length;
    },

    //| # Increment counter
    increment: function() {
      var records = this.get("records");
      records.create();
      this.trigger('change:counter', this, this.get('counter'))
    },
    
    addRecord: function(data){
      var record = {};
      _.each(data, function(field){
        record[field.name] = field.value;
      });
      var records = this.get("records");
      records.create(record);
      this.trigger('change:counter', this, this.get('counter'))
    }

  });
});