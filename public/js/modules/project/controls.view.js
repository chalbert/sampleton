define([
  'jquery',
  'underscore',
  'backbone',
  'views/base.view',
  'mediator',
  'jqueryui/droppable',
  'jqueryui/effects/core'
], function ($, _, Backbone, baseView, mediator) {

  return baseView.extend({

    el:  ".controls",

    elements: {
      'start': '.control-start',
      'pause': '.control-pause',
      'trash': '.control-trash'
    },

    shortcuts: {
      enter: 'toggleRecording'
    },

    initialize: function(){
      this._super('initialize');

      this.initializeTash();

      mediator.subscribe('recording:start', this.pushStart, this);
      mediator.subscribe('recording:stop', this.pushPause, this);

      mediator.subscribe('controlsMustClose', this.close, this);

      this.open();

    },

    initializeTash: function(){
      this.$trash.droppable({
        tolerance: 'pointer',
        hoverClass: 'active'
      });

      // Those events don't bubble, so need to attach directly on element
      this.$trash
          .bind('drop', $.proxy(this.trash_drop))
          .bind('dropover', $.proxy(this.trash_dropover))
          .bind('dropout', $.proxy(this.trash_dropout));
    },

    open: function(){
      this.$el.removeClass('closed', 350);
      this.delegateEvents(this.events());
      this._super('open');
    },

    close: function(){
      mediator.publish('controlsWillClose');
      this.$el.addClass('closed', 350);
      this.undelegateEvents();
      this._super('close');
    },

//------------------------------------------------------------------------

    //|--------|
    //| EVENTS |
    //|--------|

    events: function() {
      return this.mapEvents({
        start: 'click',
        pause: 'click'
      });
    },

    trash_drop: function(e, ui){
      mediator.publish('items:stopSorting');
      mediator.publish('items:deleteItem', ui);
    },

    start_click: function(e) {
      //mediator.publish('recording:go');
      mediator.publish('recording:start');
    },

    pause_click: function(e) {
      mediator.publish('recording:stop');
      //mediator.publish('project:go');
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
      if (this.$start.hasClass('pushed')) {
        this.pause_click();
      } else {
        this.start_click();
      }
    }

  });
});