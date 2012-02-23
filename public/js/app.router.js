define(['module', 'backbone','underscore', 'mediator'], function(module, Backbone, _, mediator){

  return new (Backbone.Router.extend({

    routes: {
      '': 'home'
    },

    initialize: function(){
      mediator.subscribe('go:back', function(target) {
        target || (target = 1)
        var route = window.location.hash.replace('#', '').split('/').slice(0, -target).join('/');
        this.navigate(route, {trigger: true});
      }, this);
      Backbone.history.start();

    },

    home: function(){
      mediator.publish('go:projects');
    }

  }));

});