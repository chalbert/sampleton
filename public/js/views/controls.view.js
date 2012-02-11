define([
  'jquery',
  'underscore',
  'backbone',
  'glasses',
  'mediator',
  'jqueryui/droppable'
], function ($, _, Backbone, o_o, mediator) {

  return o_o.view.extend({

    el:  ".controls",

    elements: {
      'start': '.control-start',
      'pause': '.control-pause',
      'trash': '.control-trash'
    },

    initialize: function(){
      this._super('initialize');

      this.$trash.droppable({
        tolerance: 'pointer',
        hoverClass: 'active'
      });

      // Don't bubble, so need to attach directly on element
      this.$trash
          .bind('drop', $.proxy(this.trash_drop))
          .bind('dropover', $.proxy(this.trash_dropover))
          .bind('dropout', $.proxy(this.trash_dropout));

      mediator.subscribe('recording:start', this.pushStart, this);
      mediator.subscribe('recording:stop', this.pushPause, this);
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

    trash_dropover: function(e, ui) {
//      this.$trash.addClass('active');
      console.log('dropover');
    },

    trash_dropout: function(e, ui) {
      console.log('dropout');
//      this.$trash.removeClass('active');
    },

    trash_drop: function(e, ui){
      mediator.publish('items:stopSorting');
      mediator.publish('items:deleteItem', ui);
    },

    start_click: function(e) {
      mediator.publish('recording:go');
    },

    pause_click: function(e) {
      mediator.publish('editing:go');
    },


//------------------------------------------------------------------------

    pushStart: function(e) {
      this.$start.addClass('pushed');
      this.$pause.removeClass('pushed');
    },

    pushPause: function(e) {
      this.$start.removeClass('pushed');
      this.$pause.addClass('pushed');
    }

  });
});