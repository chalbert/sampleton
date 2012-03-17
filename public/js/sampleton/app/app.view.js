//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'src/mixins/views/shortcutManager.mixin',
  'sampleton/app/messenger.view',
  'src/ui/searchbox.view',
  // For class animation
  'jqueryui/effects/core'

], function($, _, Backbone, shortcutManagerMixin,
            messengerView, searchBoxView) {

  return Backbone.View.extend({

    mixins: {
      shortcutManager: shortcutManagerMixin
    },

    el:  "#sampleton",

    elements: {
      content: '.content'
    },

    shortcuts: {
      backspace: 'back'
    },

    views: {
      messenger: messengerView,
      searchbox: searchBoxView,
      $content: {
        projects: 'sampleton/projects/projects.view',
        project: 'sampleton/project/project.view',
        templates: 'sampleton/templates/templates.view',
        template: 'sampleton/template/template.view'
      }
    },

    pages: {
      'projects': 'projects',
      'project': 'projects/:project*suffix',
      'templates': 'templates',
      'template': 'templates/:template'
    },

    back: function(e){}

  });
});