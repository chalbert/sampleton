//|=======================================================================|
//| VIEW ~ APP
//|=======================================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'collections/item.col',
  'views/item.view',
  // > Extensions here as not returning values
  'backboneExtension'
  ], function($, _, Backbone, Items, ItemView){

  return Backbone.BaseView.extend({
//------------------------------------------------------------------------

    el: $("#sampleton"),

    elements: {
      'input': '#new-item',
      'list': '#item-list'
    },

    initialize: function() {
      this.constructor.__super__.initialize.apply(this);
      //this.input = this.$("#new-item");
      //this.render();
      //| > When an item is added, we need to add it to the dom
      Items.bind('add',   this.addOne, this);
      //| > When the collection is reseted, we need re-add all items
      Items.bind('reset', this.addAll, this);
      //| > Every event trigger a rendering
      //| ? Is it needed?
      Items.bind('all',   this.render, this);

      Items.fetch();
    },

//------------------------------------------------------------------------
    //|--------|
    //| EVENTS |
    //|--------|

    events: function() {
      return this.generateEvents({
        input: 'keypress'
      });
    },

    input_keypress: function(e){
      switch(e.which) {
        //| > Enter key
        case 13:
          //| > If the input is not empty, create a new item
          var title = this.$el('input').val();
          if (title) {
            Items.create({title: title});
            this.$el('input').val('');
          }
        break;
      }
    },

//------------------------------------------------------------------------

    //|---------|
    //| ACTIONS |
    //|---------|

    //| > Create a new view, and append it to the list
    addOne: function(item) {
      var view = new ItemView({model: item});
      this.$el('list').append(view.render().el);
    },

    //| > Add each item
    addAll: function() {
      Items.each(function(item){
        this.addOne(item);
      }, this);
    }

  });
});
