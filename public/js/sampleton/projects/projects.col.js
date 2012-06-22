//|===================================================|
//| COLLECTION ~ ITEM
//|===================================================|
define([
  'underscore-extended',
  'backbone-extended',
  'src/mixins/collections/orderable.mixin',
  'sampleton/projects/projects.row.model'
], function(_, Backbone, orderableMixin, projectsRowModel){

  return Backbone.Collection.extend({

    model: projectsRowModel,

    mixins: {
      orderable: orderableMixin
    },

    url: '/api/projects'

  });
});