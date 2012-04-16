define([
  'jquery',
  'underscore',
  'backbone',
  'src/mixins/views/list.mixin',
  'src/mixins/views/searchable.mixin',
  'sampleton/project/item/item.view',
  'jqueryui/sortable',
  'touchpunch',
  'jqueryui/effects/core'
], function($, _, Backbone, listMixin, searchableMixin, itemView) {

  return Backbone.View.extend({

    mixins: {
      list: listMixin,
      searchable: searchableMixin
    },

    el: '#list-project',

    elements: {
      placeholder: '.placeholder',
      list: 'ul',
      rows: 'li'
    },

    rowView: itemView,

    sortableOptions: {
      items: 'li',
      handle: '.handle',
      placeholder: 'placeholder',
      helper: 'clone',
      revert: function(){
        return true;
      },
      scroll: false,
      cursorAt: {top:-12, left: 82},
      distance: 10
    },

    subscriptions: {
      'items:stopSorting': 'stopSorting',
      'items:deleteItem': 'deleteItem',
      'item:select': 'selectItem',
      'item:unselect': 'unselectAll'
    },

    setup: function(options) {
      this._super('setup', arguments);

      this.$list.sortable(this.sortableOptions);

      $('body').delegate('.item-sorting', 'mouseup', $.proxy(this.itemSorting_mouseup, this));
    },

    clean: function(){
      this.$list.sortable('destroy');
      this._super('clean', arguments);
    },

    //------------------------------------------------------------------------
    //|--------|
    //| EVENTS |
    //|--------|

    events: {
      '': 'sortstart sortupdate'
    },

    stopSorting: function(){
      this.$list.sortable('cancel');
      this.$list.sortable('destroy');
      this.$list.sortable(this.sortableOptions);
    },

    itemSorting_mouseup: function(e){

      this.$get('placeholder').css('background', 'none').animate({
        width: 140
      }, 500);

      $('.item-sorting')
          .find('.item').animate({
            height: 132
          });
    },

    sortstart: function(e, ui) {
      ui.helper
          .attr('style','')
          .addClass('item-sorting');

      //| > As the position is fixed, we need to refresh position at start
      this.$list.sortable('refreshPositions');
    },

    sortupdate: function(e, ui){
      var id = ui.item.find('.item').data('id'),
          position = ui.item.index() + 1,
          model = this.collection.get(id);

      model.save({'order': position});
    },

    deleteItem: function(ui){
      var id = ui.helper.find('.item').data('id'),
          model = this.collection.get(id);
      model.destroy();
    },

    selectItem: function(){
      this.unselectAll();
      this.$el.addClass('selection');
    },

    unselectAll: function(){
      this.$get('rows').find('.item.selected').removeClass('selected');
      this.$el.removeClass('selection');
    }

  });

});
