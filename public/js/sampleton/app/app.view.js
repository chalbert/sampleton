//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'sampleton/app/messenger.view',
  'src/ui/searchbox.view',
  // For class animation
  'jqueryui/effects/core'

], function($, _, Backbone, messengerView, searchBoxView) {

  return Backbone.View.extend({

    el:  "#sampleton",

    elements: {
      content: '.content',
      logo: '#logo'
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

    initialize: function(){
      this._super('initialize', arguments);

      // Allow to go out of a field by clicking anywhere
      if (window.Touch) {
        // Prevent elastic scrolling
        this.$content.bind('touchmove', function(e){
          e.stopPropagation();
        });
        $(document).bind('touchmove', function(e) {
            e.preventDefault();
        });

        $(document).bind('touchstart', function(e){
          if (e.target.tagName.toLowerCase() == 'input') return;
          $(':focus:first').blur();
        });
      }
    },

    events: {
      logo: 'click'
    },

    logo_click: function(e){
      Backbone.Mediator.publish('go:projects');
    },

    // Just to override default browser behavior
    back: function(e){}

  });
});