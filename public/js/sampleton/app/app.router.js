define([
  'underscore-extended',
  'backbone-extended',
  'src/mixins/routers/slash.mixin'
], function(_, Backbone, slashMixin){

  return Backbone.Router.extend({

    mixins: {
      slash: slashMixin
    },

    routes: {
      '': 'home'
    },

    initialize: function(){
      Backbone.history.start();
    },

    home: function(){
      Backbone.Mediator.publish('go:projects');
    }

  });

});