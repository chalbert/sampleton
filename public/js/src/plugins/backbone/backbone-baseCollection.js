//|===================================================|
//| BASE COLLECTION
//|===================================================|
define([
  'underscore',
  'backbone',
  'src/mixins/models/configurable.mixin',
  'backbone-mixins'
], function(_, Backbone, configurableMixin){

  Backbone.Collection = Backbone.Collection.extend({

    mixins: {
      configurable: configurableMixin
    },

    initialize: function(options){
      if (!options) options = {};
      this._super('initialize', arguments);

      if (options && options.model) this.model = options.model;
      this.on('error', function(model, err){
        var body = $.parseJSON(err.responseText);
        switch(err.status) {
          case 403:
            if (body.auth) {
              Backbone.Mediator.publish('say', 'error', "You are not authorized.");
            } else {
              Backbone.Mediator.publish('say', 'error', "You must be logged in. Redirecting...");
              setTimeout(function(){
                window.location = '/login';
              }, 3000);
            }
            break;
        }
        // Stop bubbling to collection;
        delete err;
      }, this);

      if (this.initialized) this.initialized.apply(this, arguments);
    },

    //| # We override the create function to add the order of not provided
    //| # We Want this on the collection to abstract the model from it
    create: function(model, options){

      if (model instanceof Backbone.Model) {
        if (!model.get('order')) {
          model.set({order: this.nextOrder()});
        }
      } else if (!model || !model.order) {
        model = model || {};
        model.order = this.nextOrder();
      }

      return this._super('create', [model, options]);
    },

    //| # Generates next order
    nextOrder: function() {
      if (!this.length) return 1;
      return this.length + 1;
    },

    next: function(model) {
      var i = this.at(this.indexOf(model));
      if (undefined === i || i < 0) return false;
      return this.at(this.indexOf(model) + 1);
    },

    previous: function(model) {
      if (undefined === i || i < 1) return false;
      return this.at(this.indexOf(model) - 1);
    },
    
    filterBy: function(attribute, value){
      return this.filter(function(item){
        var filter = new RegExp(value, 'i');
        return (item.get(attribute).match(filter));
      });
    }

  });

  return Backbone;

});
