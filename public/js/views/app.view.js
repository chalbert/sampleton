//|=======================================================================|
//| VIEW ~ APP
//|=======================================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'collections/item.col',
  'views/item.view'
  ], function($, _, Backbone, Items, ItemView){

  return Backbone.View.extend({
//------------------------------------------------------------------------

    el: $("#sampleton"),

    events: {
      "keypress #new-item":  "input_keypress"
    },

    initialize: function() {
      this.input = this.$("#new-item");

      //| > When an item is added, we need to add it to the dom
      Items.bind('add',   this.addOne, this);
      //| > When the collection is reseted, we need re-add all items
      Items.bind('reset', this.addAll, this);
      //| > Every event trigger a rendering
      //| ? Is it needed?
      Items.bind('all',   this.render, this);

      Items.fetch();
    },

    render: function() {},

//------------------------------------------------------------------------
    //|----------------|
    //| EVENT HANDLERS |
    //|----------------|

    input_keypress: function(e){
      switch(e.which) {
        //| > Enter key
        case 13:
          //| > If the input is not empty, create a new item
          var title = this.input.val();
          if (title) {
            Items.create({title: title});
            this.input.val('');
          }
        break;
      }
    },

    //|---------|
    //| ACTIONS |
    //|---------|

    //| > Create a new view, and append it to the list
    addOne: function(item) {
      var view = new ItemView({model: item});
      this.$("#item-list").append(view.render().el);
    },

    //| > Add each item
    addAll: function() {
      Items.each(this.addOne);
    }

  });
});
