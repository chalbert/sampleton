//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  //'modelbinding',
  'text!/tpl/item.html'
  ], function($, _, Backbone, ModelBinding, itemsTemplate){

  return Backbone.View.extend({

    //|---------------|
    //| CONFIGURATION |
    //|---------------|
    tagName:  "li",
    template: _.template(itemsTemplate),

    events: {
      "dblclick div.item-title"   : "edit",
      "click .item"               : "click",
      "click span.item-destroy"   : "clear",
      "keypress .item-input"      : "updateOnEnter"
    },

    initialize: function() {
      //| > Sub: change -> render
      this.model.bind('change', this.render, this);
      //| > Sub: destroy -> remove from dom
      this.model.bind('destroy', this.remove, this);
      this.model.view = this;
    },

    //| > Render template with data from model
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.setTitle();
      this.setCounter();

     //ModelBinding.bind(this);

      return this;
    },

    //|---------|
    //| SETTERS |
    //|---------|
    setTitle: function() {
      var title = this.model.get('title');
      this.$('.item-title').text(title);
      this.input = this.$('.item-input');
      this.input.bind('blur', _.bind(this.close, this)).val(title);
    },

    setCounter: function() {
      var counter = this.model.get('counter');
      this.$('.item-counter').text(counter);
    },

    //|---------|
    //| ACTIONS |
    //|---------|
    //| > Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      $(this.el).addClass("editing");
      this.input.focus();
    },

    //| > Close the `"editing"` mode, saving changes to the item.
    close: function() {
      this.model.save({title: this.input.val()});
      $(this.el).removeClass("editing");
    },

    //| > If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    //| > Click on an item
    click: function() {
      this.press();
      this.model.increment();
    },

    //| > Apply the 'pressed' effect
    press: function(){
      clearTimeout(this.pressTimer);
      $(this.el).addClass("pressed");
      var that = this;
      this.pressTimer = setTimeout(function(){
        $(that.el).removeClass("pressed");
      }, 200);
    },

    //| > Remove this view from the DOM.
    remove: function() {
      $(this.el).remove();
    },

    //| > Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
      //ModelBinding.unbind(this);
    }

  });
});