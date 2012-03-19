//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'date',
  'jqueryui/effects/core'
], function($, _, Backbone){

  return Backbone.View.extend({

    tagName:  "tr",

    elements: {
      edit: '.edit',
      options: '.options',
      deleteBtn: '.btn-delete'
    },

//------------------------------------------------------------------------
    //|--------|
    //| EVENTS |
    //|--------|

    events: {
      '': 'click',
      edit: 'click',
      deleteBtn: 'click'
    },

    click: function(e){
      Backbone.Mediator.publish('go:template', this.model.id);
    },

    edit_click: function(e){
      e.stopPropagation();
      this.show_options();
    },

    show_options: function(){
      this.$options.toggleClass('open', 250);
      this.$edit.toggleClass('active');
    },

    deleteBtn_click: function(e){
      e.stopPropagation();
        this.model.destroy();
      Backbone.Mediator.publish('confirm', 'Do you want to delete this template: ' + this.model.get('title'), function(){
        this.remove();
      }, this);
    }


  });
});