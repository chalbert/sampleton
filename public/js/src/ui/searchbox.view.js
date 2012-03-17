define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {

  return Backbone.View.extend({

    el:  ".searchbox",

    elements: {
      'input': '.search-input',
      'reset': '.search-reset'
    },

    shortcuts: {
      slash: 'focus'
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
      (this.$input.val() == '')
          ? this.$input.blur()
          : this.reset();
    },

    reset_click: function(e) {
      this.reset();
    },

//------------------------------------------------------------------------
    //|---------|
    //| ACTIONS |
    //|---------|

    focus: function(){
      this.$input.focus()
    },

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
      this.publish('search' + (this.scope ? ':'+ this.scope : ''), search);
    }

  });

});