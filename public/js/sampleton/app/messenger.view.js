//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'clickout'
], function($, _, Backbone, itemsTemplate){
  'use scrict';

  return Backbone.View.extend({

    el:  ".messenger",

    elements: {
      text: 'span',
      confirm: '.confirm',
      confirmBox: '.confirm-box',
      confirmMessage: '.confirm .message',
      confirmYes: '.confirm .btn-confirm',
      confirmCancel: '.confirm .btn-cancel'
    },

    shortcuts: {
      'enter': 'confirmYes_click',
      'escape': 'confirmCancel_click'
    },

    subscriptions: {
      confirm: 'showConfirm',
      say: 'addMessage',
      loading: function(name, message){
        this.addMessage('loading:' + name, message || this.message.loading);
        Backbone.Mediator.subscribe('loaded:' + name, function () {
          this.removeMessage('loading:' + name);
        }, this);
      }
    },

    open: function(){
      this.hide();
      this._super('open', arguments);
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

    emptyMessages: function(){
      this.messageStack = [];
    },

//------------------------------------------------------------------------
    //|--------|
    //| EVENTS |
    //|--------|

    events: {
      confirmYes: 'click',
      confirmCancel: 'click'
    },

    confirmBox_clickout: function(e){
      this.hideConfirm();
    },

    confirmYes_click: function(){
      this.callback.apply(this.context);
      this.hideConfirm();
    },

    confirmCancel_click: function(){
      this.hideConfirm();
    },

//------------------------------------------------------------------------
    //|---------|
    //| ACTIONS |
    //|---------|

    displayMessage: function () {
      var message = this.messageStack[0][1];

      this.$text
          .stop(true, true)
          .text(message)
          .addClass('message')
          .fadeIn(350);
    },

    hide: function(){
      this.$text
          .stop(true, true)
          .fadeOut(250);
    },

    showConfirm: function(message, callback, context){
      this.callback = callback;
      this.context = context;
      this.$confirmMessage.text(message);
      this.$confirmBox.clickout($.proxy(this.confirmBox_clickout, this));
      this.$confirm.show();
    },

    hideConfirm: function(){
      this.$confirmBox.unbind('clickout');
      this.$confirm.hide(350);
    }

  });
});