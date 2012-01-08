
// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  //Item Model
  // ----------

  // Our basic **Item** model has `text`, `order`, and `done` attributes.
  window.Item = Backbone.Model.extend({
	  idAttribute: "_id",

    // Default attributes for a item item.
    defaults: function() {
      return {
        counter:  0,
        order: Items.nextOrder()
      };
    },

    // Toggle the `done` state of this item item.
    inc: function() {
      this.save({counter: this.get("counter") + 1});
    }

  });

  // Item Collection
  // ---------------

  // The collection of items used to be backed by *localStorage* instead of a remote
  // server, but now uses our /api/items backend for persistance.
  window.ItemList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Item,

    // Save all of the item items under the `"items"` namespace.
    //localStorage: new Store("items"),
	  url: '/api/items',

    // We keep the Items in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Items are sorted by their original insertion order.
    comparator: function(item) {
      return item.get('order');
    }

  });

  // Create our global collection of **Items**.
  window.Items = new ItemList;

  // Item Item View
  // --------------

  // The DOM element for a item item...
  window.ItemView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      "dblclick div.item-text"    : "edit",
      "click span.item-destroy"   : "clear",
      "keypress .item-input"      : "updateOnEnter"
    },

    // The ItemView listens for changes to its model, re-rendering.
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    // Re-render the contents of the item item.
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.setTitle();
      return this;
    },

    // To avoid XSS (not that it would be harmful in this particular app),
    // we use `jQuery.text` to set the contents of the item item.
    setTitle: function() {
      var title = this.model.get('title');
      this.$('.item-text').text(title);
      this.input = this.$('.item-input');
      this.input.bind('blur', _.bind(this.close, this)).val(title);
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      $(this.el).addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the item.
    close: function() {
      this.model.save({text: this.input.val()});
      $(this.el).removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove this view from the DOM.
    remove: function() {
      $(this.el).remove();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  window.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#sampleton"),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-item":  "createOnEnter",
    },

    // At initialization we bind to the relevant events on the `Items`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting items that might be saved in *localStorage*.
    initialize: function() {
      this.input    = this.$("#new-item");

      Items.bind('add',   this.addOne, this);
      Items.bind('reset', this.addAll, this);
      Items.bind('all',   this.render, this);

      Items.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
    },

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
      Items.create({title: title});
      this.input.val('');
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});