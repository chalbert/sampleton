//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'glasses',
  'mediator',
  // Items
  'views/itemList.view',
  'views/item.view',
  'collections/item.col',
  // Searchbox
  'views/searchbox.view',
  // Controls
  'views/controls.view',
  // Messenger
  'views/messenger.view',
  // ROUTERS
  'routers/app.router'

], function($, _, Backbone, o_o, mediator, itemListView, itemView, itemCollection,
            searchboxView, controlsView, messengerView, appRouter){

  return o_o.view.extend({

    el:  "#sampleton",

    views: {},
    routers: {},

    elements: {
      'content': '.content'
    },

    initialize: function() {
      this._super('initialize');

      //|-------|
      //| VIEWS |
      //|-------|
      this.views.itemList = new itemListView({
        rowView: itemView,
        collection: new itemCollection()
      });
      this.views.searchbox = new searchboxView({
        listView: this.views.itemList
      });
      this.views.controls = new controlsView();
      this.views.messenger = new messengerView();

      //|---------|
      //| ROUTERS |
      //|---------|

      mediator.subscribe('records:open', function(itemId){
        this.loadRecords(itemId);
      }, this);

      this.routers.app = new appRouter();
      Backbone.history.start();

    },

    loadRecords: function(itemId){

      require([
        'views/record.view',
        'views/recordList.view',
        'collections/record.col'],
          $.proxy(function(recordView, recordListView, recordCollection) {
            if (!this.views.records) {
              this.views.records = new recordListView({
                item: this.views.itemList.collection.get(itemId),
                rowView: recordView,
                recordCollection: recordCollection
              });
              this.$el.append(this.views.records.$el);
            } else {
              this.views.records.item = this.views.itemList.collection.get(itemId);
            }
            this.views.records.open();

          }, this)
      );

    }

  });
});