//|===================================================|
//| BASE VIEW
//|===================================================|

define([
  'jquery',
  'underscore',
  'libs/vendor/backbone/backbone',
  'modelBinding',
  'backbone-elements',
  'backbone-multiviews'
], function($, _, Backbone){

  Backbone.View = Backbone.View.extend({

    //| # data-sync attribute extends the modelbinding plugin by specify if
    setBindingSync: function(){
      //|   the database should be sync after change
      var filter = function(container, selector){
        var result = [];
        if (container.find(selector).length) {
          $.merge(result, $(container).children(selector));
          container.children(':not(.view):has(' + selector + ')').each(function(){
            $.merge(result, filter($(this), selector));
          });
        }
        return $(result);
      };

      filter(this.$el, '[data-sync]').each($.proxy(function(index, el){
        this.model.on('change:' + $(el).attr('name'), function(value, options){
          if (this.model.id) {
            Backbone.sync.call(this, 'update', this.model, options);
          }
        }, this);
      }, this));
    },

    setup: function(){

      // | > If we destroy the model, the view need to go
      if (this.model) {
        this.model.on('destroy', function(){
          this.remove();
        }, this);
      }

      //| > Let's redelegate the events.
      this.delegateEvents(this.events);
      this.setBindings();

      //| > Delegate shorcuts to shortcut manager
      this.publish('shortcut:add', this.shortcuts, this);

    },

    setBindings: function(){
      if (!this.model) return;

      this.setBindingSync();
      //| > Let's use name attribute (ID is default) for modelbinding,
      //|   so 2 modules can use the same identifier in the same page
      ModelBinding.bind(this, { all: "name" })
    }

  });

  return Backbone;

});