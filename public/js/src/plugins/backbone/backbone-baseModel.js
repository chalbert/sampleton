define([
  'jquery',
  'underscore',
  'backbone',
  'src/mixins/models/configurable.mixin',
  'backbone-mixins'
], function($, _, Backbone, configurableMixin){

  Backbone.Model = Backbone.Model.extend({

    mixins: {
      configurable: configurableMixin
    },

    idAttribute : '_id',

    initialize: function(options){
      options || (options = {});
      this._super('initialize', arguments);

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

    get: function (attr) {
      if (!attr) return;
      if (attr == 'id') return this.id;
      var property = this._super('get', [attr]);//.call(this, attr),
          method = this['get' + _.capitalize(attr)];
      if (!property && property !== 0 && typeof method == 'function')
      {
        return method.call(this);
      }

      return property;
    },

    getPosition: function() {
      return this.collection.indexOf(this) + 1;
    },

    getCreated_at_string: function(){
      return new Date(this.get('created_at')).toString('dddd, MMMM, d, yyyy');
    }

  });

  return Backbone;

});