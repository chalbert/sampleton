//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'views/base.view',
  'mediator'
], function($, _, Backbone, baseView, mediator, itemsTemplate){

  return baseView.extend({

    el:  ".messenger",

    elements: {
      'text': 'span'
    },

    initialize: function() {
      this._super('initialize');

      this.$text.fadeOut(0)

      mediator.subscribe('say', this.addMessage, this);

      mediator.subscribe('loading', function(name){
        this.addMessage('loading:' + name, this.message.loading);
        mediator.subscribe('loaded:' + name, function(){
          this.removeMessage('loading:' + name);
        }, this)
      }, this);

    },

    message: {
      loading: 'Loading...'
    },

    messageStack: [],

    addMessage: function(name, message){
      this.messageStack.unshift([name, message]);
      this.displayMessage();
    },

    removeMessage: function(name) {
      _.each(this.messageStack, function(message, key){
        if (message[0] === name) this.messageStack.splice(key, 1);
      }, this);

      if (this.messageStack.length === 0) this.hide();
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

    displayMessage: function () {
      var message = this.messageStack[0][1];

      this.$text
          .stop()
          .text(message)
          .addClass('message')
          .fadeIn(350);
    },

    hide: function(){
      this.$text
          .fadeOut(250);
    }

  });
});