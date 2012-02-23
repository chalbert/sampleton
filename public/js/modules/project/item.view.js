//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'views/base.view',
  'mediator'
  ], function($, _, Backbone, baseView, mediator){

  return baseView.extend({

    tagName:  "li",

    elements: {
      'item': '.item',
      'titleField': '.field-title',
      'title': '.title',
      'counter': '.counter',
      'history': '.btn-history'
    },

    requirements: ['model', 'html'],

    initialize: function(){
      this._super('initialize');
    },

//------------------------------------------------------------------------
   //|--------|
   //| EVENTS |
   //|--------|

    events: function() {
      return this.mapEvents({
        item: 'click',
        history: 'click',
        titleField: 'keypress:enter blur'
      });
    },

    item_click: function(e) {
      //| > If not editing, increment
      if (!this.isEditing()) {
        e.preventDefault();
        this.effect_press();
        this.model.increment();
      }
    },

    titleField_keypress_enter: function(e) {
      this.$get('titleField').blur();
    },

    titleField_blur: function(e) {
     //this.model.change();
    },

    history_click: function(e){
      e.preventDefault;
      e.stopPropagation();
      mediator.publish('go:records', this.model.project, this.model.id);
    },
    
//------------------------------------------------------------------------
    //|---------|
    //| EFFECTS |
    //|---------|

    //| > Apply the 'pressed' effect
    effect_press: function(){
      clearTimeout(this.pressTimer);
      this.$get().addClass('pressed');
      var that = this.$get();
      this.pressTimer = setTimeout(function(){
        that.removeClass('pressed');
      }, 200);
    },

//------------------------------------------------------------------------
    //|---------|
    //| HELPERS |
    //|---------|

    isEditing: function(){
      return !this.$get('counter').is(':visible');
    }

  });
});