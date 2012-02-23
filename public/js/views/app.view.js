//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'mediator',
  'app.router',
  'views/base.view',
  'mixins/moduleManager.mixin',
  'mixins/shortcutManager.mixin',
  // Searchbox
  'views/searchbox.view',
  // Messenger
  'views/messenger.view',
  // For class animation
  'jqueryui/effects/core'

], function($, _, Backbone, mediator, router, baseView, moduleManagerMixin, shortcutManagerMixin, searchboxView, messengerView, appRouter) {

  return baseView.extend({

    mixins: {
      moduleManager: moduleManagerMixin,
      shortcutManager: shortcutManagerMixin
    },

    el:  "#sampleton",

    elements: {
      content: '.content'
    },

    views: {
      messenger: messengerView,
      searchbox: searchboxView
    },

    modules: {
      projects: 'projects',
      project: 'projects/:project*next'
    },

    initialize: function() {
      this._super('initialize');
      this.registerModules(this.$content);
    }

  });
});