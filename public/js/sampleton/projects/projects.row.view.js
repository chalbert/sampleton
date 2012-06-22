//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore-extended',
  'backbone-extended',
  'date',
  'jqueryui/effects/core'
], function($, _, Backbone){

  return Backbone.View.extend({

    tagName:  "tr",

    elements: {
      edit: '.edit',
      options: '.edit-options',
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
      Backbone.Mediator.publish('go:project', this.model.id);
      e.stopPropagation();
      if (window.Touch) return false; // e.stopPropagation doesn't work on mobile (iPad)...
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
      Backbone.Mediator.publish('confirm', 'Do you want to delete the project: ' + this.model.get('title'), function(){
        this.model.destroy();
        this.remove();
      }, this);
    }


  });
});