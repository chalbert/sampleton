define([
  'jquery',
  'underscore',
  'backbone',
  'glasses',
  'mediator'
], function ($, _, Backbone, o_o, mediator) {

  return o_o.view.extend({

    el:  ".controls",

    elements: {
      'start': '.control-start',
      'pause': '.control-pause'
    },

    initialize: function(){
      this._super('initialize');

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