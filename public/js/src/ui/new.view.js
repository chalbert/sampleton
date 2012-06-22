define([
  'jquery',
  'underscore-extended',
  'backbone-extended'
], function($, _, Backbone) {

  return Backbone.View.extend({

    el: '.field-new',

    events: {
      '': 'keypress:enter keydown:escape'
    },

    shortcuts: {
      n: 'focus'
    },

    focus: _.extend(function(){
      this.$el.focus();
    }, { description: 'New' }),

    keydown_escape: function(e){
      this.$el.blur();
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

