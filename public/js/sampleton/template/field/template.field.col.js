//|===================================================|
//| COLLECTION ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'src/mixins/collections/orderable.mixin',
  'sampleton/template/field/template.field.model'
], function(_, Backbone, orderableMixin, fieldModel){

  return Backbone.Collection.extend({

    model: fieldModel,

    mixins: {
      orderable: orderableMixin
    },

    url: '/api/templates/:template/fields'

  });
});