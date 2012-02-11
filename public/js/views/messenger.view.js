//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'glasses',
  'mediator'
], function($, _, Backbone, o_o, mediator, itemsTemplate){

  return o_o.view.extend({

    el:  ".messenger",

    elements: {
      'text': 'span'
    },

    initialize: function() {
      this._super('initialize');

      this.$text.fadeOut(0)

      mediator.subscribe('error', this.dislayError, this);
    },

//------------------------------------------------------------------------

    //|--------|
    //| EVENTS |
    //|--------|

    events: function() {
      return this.mapEvents({
      });
    },

//------------------------------------------------------------------------

    //|---------|
    //| ACTIONS |
    //|---------|


    display: function (type, message) {
      this.$text
          .stop()
          .text(message)
          .removeClass()
          .addClass(type)
          .fadeIn(400)
          .delay(8000)
          .fadeOut(350);
    },

    dislayError: function(message){
      this.display('error', message);
    }

  });
});