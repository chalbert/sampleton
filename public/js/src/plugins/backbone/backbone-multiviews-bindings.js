//|===================================================|
//| BASE VIEW
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'modelBinding',
  'backbone-elements',
  'backbone-multiviews'
], function($, _, Backbone, ModelBinding){

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
      this.setBindings();
      this._super('setup', arguments);
    },

    clean: function(){
      if (this.model) ModelBinding.unbind(this);
      this._super('clean', arguments);
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