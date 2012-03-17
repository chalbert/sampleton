define([
  'jquery',
  'underscore',
  'backbone',
  'src/mixins/views/list.mixin',
  'src/mixins/views/searchable.mixin',
  'text!/templates/app/templates/templates.html',
  'sampleton/templates/templates.row.view',
  'sampleton/templates/templates.col',
  'src/ui/new.view'
], function ($, _, Backbone, listMixin, searchableMixin, templatesTemplate, templateView,
             templatesCollection, newView) {

  var Templates = new templatesCollection();

  return Backbone.View.extend({

    mixins: {
      list: listMixin,
      searchable: searchableMixin
    },

    className: 'templates',
    tagName: 'section',

    html: templatesTemplate,
    collection: Templates,
    rowView: templateView,
    rowName: 'template',

    elements: {
      newField: '.field-new',
      list: '#list-templates table',
      rows: '#list-templates tr',
      back: '.btn-back'
    },

    events: {
      back: 'click'
    },

    views: {
      newField: newView.extend({collection: Templates})
    },

    back_click: function(){
      this.publish('go:projects');
    }

  });
});