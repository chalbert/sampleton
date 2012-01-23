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
        input: 'keyup change',
        reset: 'click'
      });
    },

    input_change: function(e) {
      this.search();
    },

    input_keyup: function(e) {
      this.search();
    },

    reset_click: function(e) {
      this.$el('input').val('');
      this.listView.resetFilter();
    },

//------------------------------------------------------------------------

   //|---------|
   //| ACTIONS |
   //|---------|

  search: function(){
    var search = this.$el('input').val();
    this.listView.filterByTitle(search);
  }

  });


});