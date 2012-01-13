//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'text!/tpl/item.html',
  // > Extensions here as not returning values
  'backboneExtension'
  ], function($, _, Backbone, itemsTemplate){

  return Backbone.BaseView.extend({

    tagName:  "li",

    template: _.template(itemsTemplate),

    elements: {
      'item'    : '.item',
      'input'   : '.item-input',
      'title'   : '.item-title',
      'counter' : '.item-counter'
    },

    initialize: function() {
      this.constructor.__super__.initialize.apply(this);
      //| > If changed must render
      this.model.bind('change', this.render, this);
      //| > If destroyed must remove from dom
      this.model.bind('destroy', this.remove, this);

      this.model.view = this;
    },

//------------------------------------------------------------------------

   //|--------|
   //| EVENTS |
   //|--------|

    events: function() {
      return this.registerEvents({
        item: 'click',
        title: 'click dblclick',
        input: 'blur'
      });

//      return this.buildEventObject({
//        item: {click: 'item_click'},
//        title: {
//          click: 'item_click',
//          dblclick: 'itemTitle_dblClick'
//        },
//        input: {
//          keypress: 'input_keypress',
//          blur: 'input_blur'
//        }
//      });
    },

    title_click: function(e) {
      //| > To allow dblclick on title, we need to prevent increment
      e.stopPropagation();
    },

    title_dblclick: function(e) {
      this.startEditing();
    },

    item_click: function(e) {
      //| > If not editing, increment
      if (!this.$el().hasClass("editing")) {
        this.effect_press();
        this.model.increment();
      }
    },

    input_keypress: function(e) {
      switch(e.which) {
        //| > Enter key
        case 13:
          //| > Submit new title
          this.applyEditing();
        break;
      }
    },

    input_blur: function(e) {
     this.applyEditing();
    },

//------------------------------------------------------------------------
    //|-----------|
    //| RENDERING |
    //|-----------|

    //| > Render template with data from model
    render: function() {
      //| > Render the template with data
      this.$el().html(this.template(this.model.toJSON()));

      //| > We need to set elements after rendering the main element
      //this.setElements();

      this.renderTitle();
      this.renderCounter();

      return this;
    },

    renderTitle: function() {
      var title = this.model.get('title');
      this.$el('title').text(title);
      this.$el('input').val(title);
    },

    renderCounter: function() {
      var counter = this.model.get('counter');
      this.$el('counter').text(counter);
    },

//------------------------------------------------------------------------

    //|---------|
    //| ACTIONS |
    //|---------|


    //| > Switch this view into `"editing"` mode, displaying the input field.
    startEditing: function() {
      this.$el().addClass("editing");
      this.$el('input').focus();
    },

    //| > Close the `"editing"` mode, saving changes to the item.
    applyEditing: function() {
      this.model.save({title: this.$input.val()});
      this.$el().removeClass("editing");
    },

    //| > Remove this view from the DOM.
    remove: function() {
      this.$el().remove();
    },

    //| > Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    },

    //|---------|
    //| EFFECTS |
    //|---------|

    //| > Apply the 'pressed' effect
    effect_press: function(){
      clearTimeout(this.pressTimer);
      this.$el().addClass("pressed");
      var that = this.$el();
      this.pressTimer = setTimeout(function(){
        that.removeClass("pressed");
      }, 200);
    }

  });
});