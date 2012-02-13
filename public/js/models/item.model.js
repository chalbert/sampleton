//|===================================================|
//| MODEL ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'glasses',
  'collections/record.col'
], function(_, Backbone, o_o, RecordCol){

  return o_o.model.extend({

    defaults: function() {
      return {
        title: '',
        records:  {},
        order: 0
      };
    },

    initialize: function(){
      this.set('records', new RecordCol([], {item: this}));

      this.counter = this.get('counter');
      this.unset('counter');
    },

    getCounter: function() {
      var length = this.counter + this.get('records').length;
      return length;
    },

    record: (function() {
      var now = new Date();
      return {
        date: now
      }
    }),

    //| > Increment counter
    increment: function() {
      var records = this.get("records");
      records.create();
      this.trigger('change')
    }

  });
});