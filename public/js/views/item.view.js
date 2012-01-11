//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'text!/tpl/item.html'
  ], function($, _, Backbone, itemsTemplate){

  return Backbone.View.extend({

    tagName:  "li",
    template: _.template(itemsTemplate),

    events: {
      //| > Item
      "click .item"               : "item_click",
      //| > Title
      "click div.item-title"      : "itemTitle_click",
      "dblclick div.item-title"   : "itemTitle_dblClick",
      //| > Input
      "keypress .item-input"      : "input_keypress"
    },

    initialize: function() {
      //| > If changed must render
      this.model.bind('change', this.render, this);
      //| > If destroyed must remove from dom
      this.model.bind('destroy', this.remove, this);
      this.model.view = this;
    },

    //| > Render template with data from model
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.renderTitle();
      this.renderCounter();

      return this;
    },

//------------------------------------------------------------------------

    //|----------------|
    //| EVENT HANDLERS |
    //|----------------|

    itemTitle_click: function(e) {
      //| > To allow dblclick on title, we need to prevent increment
      e.stopPropagation();
    },

    itemTitle_dblClick: function(e) {
      this.startEditing();
    },

    item_click: function(e) {
      //| > If not editing, increment
      if (!$(this.el).hasClass("editing")) {
        this.effect_press();
        this.model.increment();
      }
    },

    input_keypress: function(e) {
      switch(e.which) {
        //| > Enter key
        case 13:
          //| >
          this.applyEditing();

        break;
      }
    },

    //|---------|
    //| ACTIONS |
    //|---------|

    renderTitle: function() {
      var title = this.model.get('title');
      this.$('.item-title').text(title);
      this.input = this.$('.item-input');
      this.input.bind('blur', _.bind(this.applyEditing, this)).val(title);
    },

    renderCounter: function() {
      var counter = this.model.get('counter');
      this.$('.item-counter').text(counter);
    },

    //| > Switch this view into `"editing"` mode, displaying the input field.
    startEditing: function() {
      $(this.el).addClass("editing");
      this.input.focus();
    },

    //| > Close the `"editing"` mode, saving changes to the item.
    applyEditing: function() {
      this.model.save({title: this.input.val()});
      $(this.el).removeClass("editing");
    },

    //| > Remove this view from the DOM.
    remove: function() {
      $(this.el).remove();
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
      $(this.el).addClass("pressed");
      var that = this;
      this.pressTimer = setTimeout(function(){
        $(that.el).removeClass("pressed");
      }, 200);
    }

  });
});