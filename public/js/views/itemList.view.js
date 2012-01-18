//|=======================================================================|
//| VIEW ~ ITEM LIST
//|=======================================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'glasses',
  ], function($, _, Backbone, o_o){

  return o_o.view.extend({

    el: '.item-list-wrapper',

    elements: {
      'input': '#new-item',
      'list': '#item-list'
    },

    requirements: ['rowView', 'collection'],

    initialize: function() {
      this._super('initialize');

      //| > When an item is added, we need to add it to the dom
      this.collection.bind('add',   this.addOne, this);
      //| > When the collection is reseted, we need re-add all items
      this.collection.bind('reset', this.addAll, this);
      //| > Every event trigger a rendering
      //| ? Is it needed?
      this.collection.bind('all',   this.render, this);

      this.collection.fetch();
    },

//------------------------------------------------------------------------
    //|--------|
    //| EVENTS |
    //|--------|

    events: function() {
      return this.generateEvents({
        input: 'keypress:enter'
      });
    },

    input_keypress_enter: function(e){
      //| > If the input is not empty, create a new item
      var title = this.$el('input').val();
      if (title) {
        this.collection.create({title: title});
        this.$el('input').val('');
      }
    },

//------------------------------------------------------------------------

    //|---------|
    //| ACTIONS |
    //|---------|

    //| > Create a new view, and append it to the list
    addOne: function(model) {
      var view = new this.rowView({model: model});
      this.$el('list').append(view.render().el);
    },

    //| > Add each item
    addAll: function() {
      this.collection.each(function(model){
        this.addOne(model);
      }, this);
    }

  });
});
