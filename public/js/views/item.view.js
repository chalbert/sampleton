//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'glasses',
  'text!/tpl/item/item.html'
  ], function($, _, Backbone, o_o, itemsTemplate){

  return o_o.view.extend({

    tagName:  "li",

    template: _.template(itemsTemplate),

    elements: {
      'item': '.item',
      'input': '.item-input',
      'title': '.item-title',
      'counter': '.item-counter'
    },

    requirements: ['model'],

    initialize: function() {
      this._super('initialize');

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
      return this.mapEvents({
        item: 'click',
        title: 'click dblclick',
        input: 'keypress:enter blur'
      });
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
      if (!this.isEditing()) {
        this.effect_press();
        this.model.increment();
      }
    },

    input_keypress_enter: function(e) {
      this.applyEditing();
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
      this.$el().addClass('editing');
      this.$el('input').focus();
    },

    //| > Close the `"editing"` mode, saving changes to the item.
    applyEditing: function() {
      this.model.save({title: this.$el('input').val()});
      this.$el().removeClass('editing');
    },

    hide: function(){
      this.$el().addClass('hidden');
    },

    show: function(){
      this.$el().removeClass('hidden');
    },

    //|---------|
    //| EFFECTS |
    //|---------|

    //| > Apply the 'pressed' effect
    effect_press: function(){
      clearTimeout(this.pressTimer);
      this.$el().addClass('pressed');
      var that = this.$el();
      this.pressTimer = setTimeout(function(){
        that.removeClass('pressed');
      }, 200);
    },

    //|---------|
    //| HELPERS |
    //|---------|

    isEditing: function(){
      return this.$el().hasClass('editing');
    }

  });
});