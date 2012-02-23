//|===================================================|
//| COLLECTION ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'collections/baseCollection.col',
  'modules/projects/projects.model'
], function(_, Backbone, baseCollection, Project){

  return baseCollection.extend({

    model: Project,

    url: '/api/projects',

//------------------------------------------------------------------------

    //| > Used by Backbone to sort by order
    comparator: function(project) {
      return project.get('order');
    }

  });
});