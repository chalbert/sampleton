//|===================================================|
//| COLLECTION ~ ITEM
//|===================================================|
define([
  'underscore-extended',
  'backbone-extended',
  'src/mixins/collections/orderable.mixin',
  'sampleton/project/item/item.model'
], function(_, Backbone, orderableMixin, Item){

  return Backbone.Collection.extend({

    mixins: {
      orderable: orderableMixin
    },

    model: Item,

    url: '/api/projects/:project/items'

  });
});