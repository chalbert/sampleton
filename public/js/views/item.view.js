//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'glasses',
  'mediator',
  'text!/templates/item/item.html'
  ], function($, _, Backbone, o_o, mediator, itemsTemplate){

  return o_o.view.extend({

    tagName:  "li",

    template: _.template(itemsTemplate),

    elements: {
      'item': '.item',
      'titleField': '.field-title',
      'title': '.title',
      'counter': '.counter',
      'history': '.btn-history'
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
     this.applyEditing();
    },

    history_click: function(e){
      e.preventDefault;
      e.stopPropagation();
      mediator.publish('records:go', this.model.id);
    },
    
//------------------------------------------------------------------------
    //|-----------|
    //| RENDERING |
    //|-----------|

    //| > Render template with data from model
    render: function() {
      //| > Render the template with data
      this.$get().html(this.template(this.model.toJSON()));
      this.renderTitle();
      this.renderCounter();

      return this;
    },

    renderTitle: function() {
      var title = this.model.get('title');
      this.$get('title').text(title);
      this.$get('titleField').val(title);
    },

    renderCounter: function() {
      var counter = this.model.get('counter');
      this.$get('counter').text(counter);
    },

//------------------------------------------------------------------------

    //|---------|
    //| ACTIONS |
    //|---------|

    //| > Close the `"editing"` mode, saving changes to the item.
    applyEditing: function() {
      this.model.save({title: this.$get('titleField').val()});
    },

    hide: function(){
      this.$get().addClass('hidden');
    },

    show: function(){
      this.$get().removeClass('hidden');
    },

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

    //|---------|
    //| HELPERS |
    //|---------|

    isEditing: function(){
      return !this.$get('counter').is(':visible');
    }

  });
});