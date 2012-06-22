define([
  'jquery',
  'underscore-extended',
  'backbone-extended',
  'clickout'
], function($, _, Backbone){
  'use strict';

  return Backbone.View.extend({

    el:  "#shortcuts",

    elements: {

    },

    shortcuts: {
      '?': 'expand'
    },

    subscriptions: {

    },

    initialize: function(){

      Backbone.Shortcuts.on('shortcutsChange', function(shortcuts){
        var preview = [];

        _.each(shortcuts, function(shortcut, key){
          if (!shortcut || !shortcut.length) return;
          preview.push('<li class="shortcut"><span class="key"></span>' + key.toLowerCase() + '</span>: <span class="description">' + shortcut[0].name + '</span></li>');
        });

        this.$el.find('ul').html(preview.join('&nbsp;&nbsp;&nbsp;'));
      }, this);
      this._super('initialize', arguments);
    },

    events: {
      '': 'click'
    },

    expandedShortcuts: {
      escape: 'closeShortcuts'
    },

    closeShortcuts: _.extend(function(){
      this.click();
    }, { description: 'Hide shortcuts' }),

    expand: _.extend(function(){
      if (!this.$el.hasClass('expanded')) this.click();
    }, { description: 'Show shortcuts' }),

    click: function(e){
      var action, outSpeed;
      e.stopPropagation();
      if (this.$el.hasClass('expanded')) {
        action = 'undelegateShortcuts';
        this.$el.off('clickout');
        outSpeed = 200;
      } else {
        this.$el.on('clickout', $.proxy(this.click, this));
        action = 'delegateShortcuts';
        outSpeed = 0;
      }

      Backbone.Shortcuts[action](this.expandedShortcuts, this);

      this.$el.fadeOut(outSpeed, function(){
        $(this).toggleClass('expanded').fadeIn(150);
      });


    }


  });
});