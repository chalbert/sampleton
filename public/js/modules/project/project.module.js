define([
  'mediator',
  'modules/project/project.model',
  'modules/project/item.view',
  'modules/project/project.view',
  'modules/project/item.col',
  'modules/project/controls.view',
  'text!/templates/app/item/itemList.html'
], function(mediator, projectModel, itemView, itemListView, itemCollection, controlsView, itemListTemplate){

  return {
    views: {
      project: {
        view: itemListView,
        options: {
          model: new projectModel(),
          rowView: itemView,
          collection: new itemCollection(),
          html: itemListTemplate
        }
      },
      controls: {
        view: controlsView,
        options: {}
      }
    }
  }

});
