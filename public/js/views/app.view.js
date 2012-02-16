//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'glasses',
  'mediator',
  // Searchbox
  'views/searchbox.view',
  // Controls

  // Messenger
  'views/messenger.view',
  // ROUTERS
  'routers/app.router',
  // For class animation
  'jqueryui/effects/core'

], function($, _, Backbone, o_o, mediator, searchboxView, messengerView, appRouter) {

  // extends: moduleManager
  return o_o.view.extend({

    el:  "#sampleton",

    views: {},
    routers: {},

    elements: {
      'content': '.content'
    },

    shortcuts: {},

    modules: [
      'projects',
      'projects.project',
      'projects.project|controls',
      'projects.project.records'
    ],

    registerModules: function(){
      var parts, master, parent;
      this.modulesDefinition = this.modules;
      this.modules = {};
      _.each(this.modulesDefinition, function(module){
        parts = module.split('.');

        last = parts.pop().split('|');
        if (last.length > 1) master = last.shift();
        module = last;

        parent = parts.pop();
        this.modules[module] = {
          parent: parent,
          master: master
        }
      }, this);
    },

    openModule: function(module) {
      var module = this.modules[module],
          next = function() {
            _.each(this.modules, function(linkedModule){
              if (linkedModule.link && linkedModule.link === module) this.loadModule(linkedModule);
            }, this);

            this.loadModule(module);
          }
      if (module) throw new Error("This module doesn't exists!");
      if (module.parent) {
        this.loadModule(module.parent, $.proxy(next, this));
      } else {
        next.call(this, module);
      }
    },

    initialize: function() {
      this._super('initialize');

      this.registerModules();

      this.views.messenger = new messengerView();

      mediator.subscribe('loadModule', this.openModule, this);

      /*
      mediator.subscribe('records:open', function(projectId, itemId){
        this.loadProject(projectId, function(){

          var next = function(){
            this.loadRecords(itemId);
          }
          var item = this.views.itemList.collection.get(itemId);
          if (!item) {
            this.views.itemList.collection.on('reset', next, this);
          } else {
            next.call(this);
          }

        });
      }, this);


      mediator.subscribe('projects:open', this.loadProjects, this);

      mediator.subscribe('project:open', function(projectId){
        this.loadProject(projectId);
      }, this);
      */

      mediator.subscribe('shortcut:add', this.addShortcuts, this);
      mediator.subscribe('shortcut:remove', this.removeShortcuts, this);

      $(document).keyup($.proxy(this.document_keyup, this));

      this.routers.app = new appRouter();
      Backbone.history.start();

    },

    document_keyup: function(e){
      var key = o_o.util.getKey(e.which);
      if (this.shortcuts[key] && this.shortcuts[key].length) {
        var shortcut = this.shortcuts[key][0];
        shortcut.fn.apply(shortcut.context, arguments);
      }
    },

    addShortcuts: function(shortcuts, context){
      this.removeShortcuts(shortcuts, context);
      _.each(shortcuts, function(shortcut, key) {
        this.shortcuts[key] || (this.shortcuts[key] = []);
        this.shortcuts[key].unshift({
          fn: context[shortcut],
          context: context
        });
      }, this);
    },

    removeShortcuts: function(shortcuts, context) {
      var stack;
      _.each(shortcuts, function(shortcut, key) {
        stack = this.shortcuts[key]
        if (stack) {
          for (var n = 0; n < stack.length; n++) {
            if (stack[n].fn === context[shortcut]) stack.splice(n, 1);
          }
        }
      }, this);
    },

    pages: [],

    loadPage: function(name, dependencies, onLoad, onLoadAgain, callback){
      if (_.values(this.pages).indexOf(name) === -1) this.pages.push(name);
      _.each(this.pages, function(page, key){
        if (name !== page) this.views[page].close();
      }, this);

      this.$content.children().addClass('closed');
      this.loadModule(name, this.$content, dependencies, onLoad, onLoadAgain, callback);
    },

    loadModule: function(name, container, dependencies, onLoad, onLoadAgain, callback){
      if (!this.views[name]) {

        require(dependencies, $.proxy(function(){

          this.views[name] = onLoad.apply(this, arguments);
          container.append(this.views[name].$el);
          if (callback) callback.call(this);

        }, this));
      } else {
        onLoadAgain.call(this, this.views[name]);
        if (callback) callback.call(this);
      }
    },

//------------------------------------------------------------------------

    loadProjects: function(){

      this.unloadControls();

      var deps = ['views/project.view', 'views/projectList.view', 'collections/project.col'];
      var onLoad = function(projectView, projectListView, projectCollection) {
        return new projectListView({
          rowView: projectView,
          collection: new projectCollection()
        });
      };
      var onLoadAgain = function(view) {
        this.views.projectList.open();
      };

      this.loadPage('projectList', deps, onLoad, onLoadAgain);

    },

    unloadControls: function(){
      mediator.publish('controlsMustClose');
      this.$content.removeClass('with-controls', 350);
    },

    loadControls: function(){
      this.$content.addClass('with-controls', 350);

      var deps = ['views/controls.view'];
      var onLoad = function(controlsView) {
        return new controlsView();
      };
      var onLoadAgain = function(view) {
        view.open();
      };
      this.loadModule('controls', this.$el, deps, onLoad, onLoadAgain);
    },

    loadProject: function(projectId, callback){
      var deps = ['views/item.view', 'views/itemList.view', 'collections/item.col'];
      var onLoad = function(itemView, itemListView, itemCollection) {
        this.loadControls();
        return new itemListView({
          rowView: itemView,
          collection: new itemCollection([], {project: projectId})
        });
      };
      var onLoadAgain = function(view) {
        if (view.collection.project !== projectId || view.$el.hasClass('closed')) {
          this.loadControls();
          view.collection.project = projectId;
          view.open();//could open all --linked views---  view.link([])
        };
      };

      this.loadPage('itemList', deps, onLoad, onLoadAgain, callback);
    },

    loadRecords: function(itemId){
      var item = this.views.itemList.collection.get(itemId);
      var deps = ['views/record.view', 'views/recordList.view', 'collections/record.col'];
      var onLoad = function(recordView, recordListView, recordCollection) {
        this.loadControls();
        return new recordListView({
          item: item,
          rowView: recordView,
          collection: new recordCollection([], {item: item})
        });
      };
      var onLoadAgain = function(view) {
        view.collection.item = item;
        view.item = item;
        view.open();
      };
      this.loadModule('recordList', this.$el, deps, onLoad, onLoadAgain);
    }

  });
});