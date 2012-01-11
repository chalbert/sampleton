define([
  'jquery',
  'underscore',
  'backbone',
  'collections/item.col',
  'views/item.view'
  ], function($, _, Backbone, Items, ItemView){

  return Backbone.View.extend({

    el: $("#sampleton"),

    events: {
      "keypress #new-item":  "createOnEnter"
    },

    // At initialization we bind to the relevant events on the `Items`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting items that might be saved in *localStorage*.
    initialize: function() {
      this.input = this.$("#new-item");

      Items.bind('add',   this.addOne, this);
      Items.bind('reset', this.addAll, this);
      Items.bind('all',   this.render, this);

      Items.fetch();
    },

    render: function() {},

    // Add a single item item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(item) {
      var view = new ItemView({model: item});
      this.$("#item-list").append(view.render().el);
    },

    // Add all items in the **Items** collection at once.
    addAll: function() {
      Items.each(this.addOne);
    },

    // If you hit return in the main input field, and there is text to save,
    // create new **Item** model persisting it to *localStorage*.
    createOnEnter: function(e) {
      var title = this.input.val();
      if (!title || e.keyCode != 13) return;
      Items.create(this.newAttributes({title: title}));
      this.input.val('');
    },

    // Generate the attributes for a new Item item.
    newAttributes: function(attributes) {
      return _.extend(attributes, {
        order:    Items.nextOrder()
      });
    }

  });
});
