define([
  'jquery',
  'underscore-extended',
  'backbone-extended',
  'src/mixins/views/list.mixin',
  'src/mixins/views/searchable.mixin',
  'sampleton/projects/projects.row.view'
], function ($, _, Backbone, listMixin, searchableMixin, projectsRowView) {

  return Backbone.View.extend({

    mixins: {
      list: listMixin,
      searchable: searchableMixin
    },

    el: '#list-projects',

    rowView: projectsRowView,

    defaultMessage: "Welcome! To get started, create a new project."

  });
});