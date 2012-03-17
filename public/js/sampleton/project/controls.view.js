define([
  'jquery',
  'underscore',
  'backbone',
  'jqueryui/droppable',
  'jqueryui/effects/core'
], function ($, _, Backbone) {

  return Backbone.View.extend({

    el:  ".controls",

    elements: {
      'start': '.control-start',
      'pause': '.control-pause',
      'trash': '.control-trash'
    },

    shortcuts: {
      enter: 'toggleRecording'
    },

    setup: function(){
      this._super('setup', arguments);

      this.setupTrash();
      this.subscribe('recording:start', this.pushStart, this);
      this.subscribe('recording:stop', this.pushPause, this);
      this.$el.removeClass('closed');
    },

    setupTrash: function(){
      this.$get('trash').droppable({
        tolerance: 'pointer',
        hoverClass: 'active'
      });

      //| > Those events don't bubble, so need to attach directly on element
      this.$trash
          .bind('drop', $.proxy(this.trash_drop, this))
          .bind('dropover', $.proxy(this.trash_dropover, this))
          .bind('dropout', $.proxy(this.trash_dropout, this));
    },

    close: function(){
      this._super('close', arguments);

      this.$el.addClass('closed');
      this.$trash.unbind();
      this.$trash.droppable('destroy');
    },

    show: function(){},

    hide: function(){},

//------------------------------------------------------------------------
    //|--------|
    //| EVENTS |
    //|--------|

    events: {
      start: 'click',
      pause: 'click'
    },

    trash_drop: function(e, ui){
      this.publish('items:stopSorting');
      this.publish('items:deleteItem', ui);
    },

    start_click: function(e) {
      this.publish('recording:start');
    },

    pause_click: function(e) {
      this.publish('recording:stop');
    },

//------------------------------------------------------------------------

    pushStart: function(e) {
      this.$start.addClass('pushed');
      this.$pause.removeClass('pushed');
    },

    pushPause: function(e) {
      this.$start.removeClass('pushed');
      this.$pause.addClass('pushed');
    },

    toggleRecording: function(){
      this.$start.hasClass('pushed')
          ? this.pause_click()
          : this.start_click();
    }

  });
});