define([
  'jquery',
  'underscore',
  'backbone',
  'views/base.view',
  'mixins/list.mixin',
  'mediator'
], function ($, _, Backbone, baseView, listMixin, mediator) {

  return baseView.extend({

    mixins: {
      list: listMixin
    },

    className: 'projects',
    tagName: 'section',

    shortcuts: {
      backspace: 'back'
    },

    elements: {
      input: '.field-new',
      list: '#list-projects',
      rows: '#list-projects tr'
    },

    initialize: function(){
      this._super('initialize');
    },

//------------------------------------------------------------------------
    //|--------|
    //| EVENTS |
    //|--------|

    events: function() {
      return this.mapEvents({
        input: 'keypress:enter'
      });
    },

    back: function(e){

    },

    input_keypress_enter: function(e){
      //| > If the input is not empty, create a new item
      var title = this.$get('input').val();
      if (title) {
        this.collection.create({title: title});
        this.$get('input').val('');
      }
    }

  });
});