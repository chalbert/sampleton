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
      Backbone.Mediator.publish('shortcut:add', this.shortcuts, this);

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