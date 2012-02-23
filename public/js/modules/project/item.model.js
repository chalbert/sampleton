//|===================================================|
//| MODEL ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'models/base.model',
  'modules/records/record.col'
], function(_, Backbone, baseModel, RecordCol){

  return baseModel.extend({

    defaults: function() {
      return {
        title: '',
        records:  [],
        order: 0
      };
    },

    initialize: function(){
      var collection = new RecordCol();
      collection.configure(this.project, this.id);
      this.set('records', collection);

      this.counter = this.get('counter');
      this.unset('counter');
    },

    counter: 0,
    getCounter: function() {
      var length = this.counter + this.get('records').length;
      return length;
    },

//    record: (function() {
//      var now = new Date();
//      return {
//        created_at: now
//      }
//    }),

    //| > Increment counter
    increment: function() {
      var records = this.get("records");
      records.create();
      this.trigger('change')
    }

  });
});