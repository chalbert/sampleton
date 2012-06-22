//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore-extended',
  'backbone-extended',
  'sampleton/app/messenger.view',
  'sampleton/app/shortcuts.view',
  'sampleton/app/help.view',
  'src/ui/searchbox.view',
  // For class animation
  'jqueryui/effects/core',
  'tooltip'

], function($, _, Backbone, messengerView, shortcutsView, searchBoxView) {

  return Backbone.View.extend({

    el:  "#sampleton",

    elements: {
      content: '.content',
      logo: '#logo',
      userBtn: '.nav-top .btn-user'
    },

    views: {
      messenger: messengerView,
      //shortcuts: shortcutsView,
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
      if (!('ontouchstart' in document.documentElement)) this.views.shortcuts = shortcutsView;
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

      $(window).bind('dragover drop', function(e){
        e.preventDefault();
      });

      if (!window.Touch) {
        $('.content').tooltip({
          delay: 1000,
          animSpeed: 250
        });
      }

    },

    events: {
      logo: 'click',
      userBtn: 'click'
    },

    logo_click: function(e){
      Backbone.Mediator.publish('go:projects');
    },

    userBtn_click: function(e){
      e.stopPropagation();
    }

  });
});