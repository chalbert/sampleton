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
  // Records
  'views/record.view',
  'views/recordList.view',
  'collections/record.col',
  // ROUTERS
  'routers/app.router'

], function($, _, Backbone, o_o, mediator, itemListView, itemView, itemCollection,
            searchboxView, controlsView, recordView, recordListView, recordCollection, appRouter){

  return o_o.view.extend({

    el:  "#sampleton",

    views: {},
    routers: {},

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

      //|---------|
      //| ROUTERS |
      //|---------|

      mediator.subscribe('editing:start', this.startEditing, this);
      mediator.subscribe('editing:stop', this.stopEditing, this);
      mediator.subscribe('records:load', this.loadRecords, this);

      this.routers.app = new appRouter();
      Backbone.history.start();

    },

    startEditing: function(){
      this.$el.addClass('editing');
    },

    stopEditing: function(){
      this.$el.removeClass('editing');
    },

    loadRecords: function(itemId){
      var records = this.views.records || (this.views.records = this.newRecords());
      records.rendered || (this.$el.append(records.render().$el));
    },

    newRecords: function(){
      return new recordListView({
        rowView: recordView,
        recordCollection: recordCollection
      })
    }

  });
});