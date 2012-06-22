define([
  'jquery',
  'underscore-extended',
  'backbone-extended',
  'text!../../../templates/app/projects/projects.html',
  'src/ui/new.view',
  'sampleton/projects/projects.collection.view',
  'sampleton/projects/projects.col'
], function ($, _, Backbone, projectsTemplate, newView, collectionView, projectCollection) {

  var Projects = new projectCollection();

  return Backbone.View.extend({

    className: 'projects',
    tagName: 'section',

    html: projectsTemplate,

    elements: {
      newField: '.field-new'
    },

    views: {
      list: collectionView.extend({collection: Projects}),
      newField: newView.extend({collection: Projects})
    }

  });
});