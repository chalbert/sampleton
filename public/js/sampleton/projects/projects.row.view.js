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
      this.publish('go:project', this.model.id);
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
      this.publish('confirm', 'Do you want to delete the project: ' + this.model.get('title'), function(){
        this.model.destroy();
        this.remove();
      }, this);
    }


  });
});