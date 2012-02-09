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
        this.$get('reset').removeClass('hidden');
        this.listView.filterByTitle(search);
      } else {
        this.$get('reset').addClass('hidden');
      }
    },

    reset: function(){
      this.$get('reset').addClass('hidden');
      this.$get('input').val('');
      this.listView.resetFilter();
    }

  });


});