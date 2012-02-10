define(['backbone','underscore', 'mediator'], function(Backbone, _, mediator){
  return Backbone.Router.extend({
    routes: {
      "": "editing",
      "recording": "recording",
      "records/:item": "records"
    },

    initialize: function(){

      _.forEach(this.routes, function(name, route) {
        mediator.subscribe(name + ':go', function(){
          var matches = route.match(/:\w+/g),
              args = Array.prototype.slice.call(arguments);
          _.forEach(matches, function(match){
            route = route.replace(match, args.shift());
          });
          this.navigate(route, {trigger: true});
        }, this);
      }, this);

    },

    recording: function(){
      mediator.publish('recording:start');
    },

    editing: function(){
      mediator.publish('recording:stop');
      mediator.publish('records:close');
    },

    records: function(itemId){
      mediator.publish('records:load', itemId);
      mediator.publish('records:open', itemId);
    }
  });
});