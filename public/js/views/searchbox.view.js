define([
  'jquery',
  'underscore',
  'backbone',
  'glasses'
], function ($, _, Backbone, o_o) {

  return o_o.view.extend({

    el:  ".searchbox",

    elements: {
      'input': '.search-input',
      'reset': '.search-reset'
    },

    requirements: ['listView'],

    initialize: function(){
      this._super('initialize');
      var input = this.$el('input');
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
      var search = this.$el('input').val();
      if (search) {
        this.$el('reset').removeClass('hidden');
        this.listView.filterByTitle(search);
      } else {
        this.$el('reset').addClass('hidden');
      }
    },

    reset: function(){
      this.$el('reset').addClass('hidden');
      this.$el('input').val('');
      this.listView.resetFilter();
    }

  });


});