define([
  'jquery',
  'underscore',
  'backbone',
  'mediator',
  'views/base.view'
], function ($, _, Backbone, mediator, baseView) {

  return baseView.extend({

    el:  ".searchbox",

    elements: {
      'input': '.search-input',
      'reset': '.search-reset'
    },

//------------------------------------------------------------------------
    //|--------|
    //| EVENTS |
    //|--------|

    events: function() {
      return this.mapEvents({
        input: 'keyup change keyup:escape',
        reset: 'click'
      });
    },

    input_change: function(e) {
      this.search();
    },

    input_keyup: function(e) {
      this.search();
    },

    input_keyup_escape: function(e) {
      this.reset();
    },

    reset_click: function(e) {
      this.reset();
    },

//------------------------------------------------------------------------
    //|---------|
    //| ACTIONS |
    //|---------|

    search: function(){
      var search = this.$get('input').val();
      if (search) {
        this.$get('reset').show();
        mediator.publish('search', search);
      } else {
        this.$get('reset').hide();
      }
    },

    reset: function(){
      this.$get('reset').hide();
      this.$get('input').val('');
      mediator.publish('search', null);
    }

  });


});