define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  return Backbone.View.extend({

    el: '.field-new',

    events: {
      '': 'keypress:enter'
    },
    keypress_enter: function(e){
      //| > If the input is not empty, create a new item
      var title = this.$el.val();
      if (title) {
        this.collection.create({title: title});
        this.$el.val('');
      }
    }

  });
});

