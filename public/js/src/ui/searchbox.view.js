define([
  'jquery',
  'underscore-extended',
  'backbone-extended'
], function ($, _, Backbone) {

  return Backbone.View.extend({

    el:  ".searchbox",

    elements: {
      input: '.search-input',
      reset: '.search-reset'
    },

    shortcuts: {
      '/': 'focus'
    },

//------------------------------------------------------------------------
    //|--------|
    //| EVENTS |
    //|--------|

    events: {
      input: 'keyup change keyup:escape',
      reset: 'click'
    },

    input_keyup: function(e) {
      this.input_change();
    },

    input_change: function(e) {
      this.search();
    },

    input_keyup_escape: function(e) {
      if(this.$input.val() === '') {
        this.$input.blur();
      } else {
        this.reset();
      }
    },

    reset_click: function(e) {
      this.reset();
      e.stopPropagation();
      if (window.Touch) return false;
    },

//------------------------------------------------------------------------
    //|---------|
    //| ACTIONS |
    //|---------|

    focus: _.extend(function(){
      this.$input.focus();
    }, { description: 'Search'}),

    search: function(){
      var search = this.$input.val();
      if (search) {
        this.$reset.show();
        this.applySearch(search);
      } else {
        this.reset();
      }
    },

    reset: function(){
      this.$reset.hide();
      this.$input.val('');
      this.applySearch();
    },

    applySearch: function(search){
      Backbone.Mediator.publish('search' + (this.scope ? ':'+ this.scope : ''), search);
    }

  });

});