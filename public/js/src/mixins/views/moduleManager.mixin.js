define([
  'sampleton/app/app.router'
], function (router) {

  return {

    registerModules: function(container){

      this.moduleContainer = container;

      //| > For module with sub modules, *next is used to map the parent module to child routes
      //|   but it musn't get in the prefix
      var routePrefix = this.options.moduleRoute
          ? this.options.moduleRoute.split('*')[0] + '/'
          : '';

      _.each(this.modules, function(route, name){

        var attributes = this.getRouteAttributes(routePrefix + route);

        router.route(routePrefix + route, name, function(){
          var args = _.toArray(arguments),
              attrs = {};
          _.each(args, function(arg, i){
            if (attributes[i]) attrs[attributes[i]] = arg;
          });
          Backbone.Mediator.publish.apply(this, ['open:' + name, attrs]);
        });

        Backbone.Mediator.subscribe('go:' + name, function() {
          var args = _.toArray(arguments),
              prefix = routePrefix,
              newRoute ;

          if (args[0] === 'this') {
            prefix = window.location.hash + '/';
            args.shift();
          }

          newRoute = prefix + route.split('*')[0],

          newRoute = this.replaceRouteArgs(newRoute, args);
          router.navigate(newRoute, {trigger: true});
        }, this);

        Backbone.Mediator.subscribeOnce('open:' + name, function(){
          var args = _.toArray(arguments);
          Backbone.Mediator.subscribeOnce('loaded:' + name, function(){
            args.unshift('open:' + name);
            Backbone.Mediator.publish.apply(null, args);
          }, this);
          this.loadModule(name, arguments);

        }, this);


        Backbone.Mediator.subscribe('open:' + name, function(){
          if (this.activeModule && (!this.modules[this.activeModule] || name === this.activeModule)) return;
          if (this.activeModule) Backbone.Mediator.publish('close:' + this.activeModule);
          this.moduleContainer.removeClass('module-' + this.activeModule);
          this.activeModule = name;
          this.moduleContainer.addClass('module-' + this.activeModule);

        }, this);

        // To open submodule, we reload url, which will map new routes
        if (Backbone.history.options) Backbone.history.loadUrl(window.location.hash);

      }, this);

    },

    getRouteAttributes: function(route){
      var matches = route.match(/:\w+/g);
      matches = _.map(matches, function(match){
        return match.replace(':', '');
      });
      return matches;
    },

    replaceRouteArgs: function(route, args){
      var matches = route.match(/:\w+/g);

      _.forEach(matches, function(match){
        route = route.replace(match, args.shift());
      });
      return route;
    },

    loadModule: function(moduleName, args) {

      Backbone.Mediator.publish('loading', moduleName);

      require(['sampleton/' + moduleName + '/' + moduleName + '.view'], $.proxy(function(view) {

        var view = new view({moduleRoute: this.modules[moduleName]});
        this.moduleContainer.append(view.render().$el);

        // We copy the parent view attributes to its child, so it can build its route.
        Backbone.Mediator.subscribe('open:' + moduleName, function(attributes){
          var args = _.compact(_.toArray(arguments));
          if (view.opened && _.isEqual(view.attributes, _.extend({}, view.attributes, attributes))) {
            return
          };

          view.routeArgs = args;
          view.open.apply(view, args);

        }, this);

        Backbone.Mediator.subscribe('close:' + moduleName, function() {
          var args = arguments;

          _.each(view.modules, function(route, childModuleName){
            Backbone.Mediator.publish('close:' + childModuleName);
          }, this);

          view.close.apply(view, args);
        });

        Backbone.Mediator.publish('loaded:' + moduleName);

      }, this))
    }

  }

});