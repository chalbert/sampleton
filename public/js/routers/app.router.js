define(['backbone','underscore', 'mediator', 'routers/access'], function(Backbone, _, mediator, access){
  return Backbone.Router.extend({
    routes: {
      "": "editing",
      "recording": "recording",
      "records/:item": "records"
    },

    initialize: function(){

      _.forEach(this.routes, function(name, route) {
        mediator.subscribe(name + ':go', function() {
            var matches = route.match(/:\w+/g),
                args = Array.prototype.slice.call(arguments),
                newRoute = route;
            _.forEach(matches, function(match){
              newRoute = newRoute.replace(match, args.shift());
            });
            this.navigate(newRoute, {trigger: true});
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
      mediator.publish('records:open', itemId);
    }

  });

});