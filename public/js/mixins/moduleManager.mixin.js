define([
  'mediator',
  'app.router'
], function (mediator, router) {

  return {

    registerModules: function(container){

      this.moduleContainer = container;

      //| > For module with sub modules, *next is used to map the parent module to child routes
      //|   but it musn't get in the prefix
      var routePrefix = this.options.moduleRoute
          ? this.options.moduleRoute.split('*')[0] + '/'
          : '';

      _.each(this.modules, function(route, name){

        console.log(routePrefix + route);
        router.route(routePrefix + route, name, function(){
          var args = _.toArray(arguments);
          args.unshift('open:' + name);
          mediator.publish.apply(this, args);
        });

        mediator.subscribe('go:' + name, function() {

          var newRoute = routePrefix + route.split('*')[0];
          newRoute = this.replaceRouteArgs(newRoute, _.toArray(arguments));
          router.navigate(newRoute, {trigger: true});
        }, this);

        mediator.subscribeOnce('open:' + name, function(){
          var args = _.toArray(arguments);
          mediator.subscribeOnce('loaded:' + name, function(){
            args.unshift('open:' + name);
            mediator.publish.apply(null, args);

          }, this);

          this.loadModule(name);

        }, this);


        mediator.subscribe('open:' + name, function(){
          if (this.activeModule && (!this.modules[this.activeModule] || name === this.activeModule)) return;
          if (this.activeModule) mediator.publish('close:' + this.activeModule);
          container.removeClass('module-' + this.activeModule);
          this.activeModule = name;
          container.addClass('module-' + this.activeModule);

        }, this);

        // To open submodule, we reload url, which will map new routes
        if (Backbone.history.options) Backbone.history.loadUrl(window.location.hash);


      }, this);

    },

    replaceRouteArgs: function(route, args){
      var matches = route.match(/:\w+/g);

      _.forEach(matches, function(match){
        route = route.replace(match, args.shift());
      });
      return route;
    },

    loadModule: function(moduleName) {

      mediator.publish('loading', moduleName);

      require(['modules/' + moduleName + '/' + moduleName + '.module'], $.proxy(function(module) {

        _.each(module.views, function(view, viewName) {
          view.options.moduleRoute = this.modules[moduleName];
          module.views[viewName] = new view.view(view.options);
          this.moduleContainer.append(module.views[viewName].$el);
        }, this);

        // We copy the parent view attributes to its child, so it can build its route.
        mediator.subscribe('open:' + moduleName, function(){
          var args = _.compact(_.toArray(arguments));
          _.each(module.views, function(view){
            view.routeArgs = _.toArray(args);
            view.open.apply(view, args);
          }, this);
        }, this);

        mediator.subscribe('close:' + moduleName, function() {
          var args = arguments;
          _.each(module.views, function(view){

            _.each(view.modules, function(route, childModuleName){
              mediator.publish('close:' + childModuleName);
            });

            view.close.apply(view, args);
          });
        });

        mediator.publish('loaded:' + moduleName);

      }, this))
    }

  }

});