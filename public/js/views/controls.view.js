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
    }

//------------------------------------------------------------------------

  });
});