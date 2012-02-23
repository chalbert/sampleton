define([
  'mediator',
  'modules/projects/projects.row.view',
  'modules/projects/projects.view',
  'modules/projects/projects.col',
  'text!/templates/app/projects/projects.html'
], function(mediator, projectsRowView, projectsView, projectCollection, projectsTemplate){

  return {
    views: {
      projects: {
        view: projectsView,
        options: {
          rowView: projectsRowView,
          collection: new projectCollection(),
          html: projectsTemplate
        }
      }
    }
  }

});
