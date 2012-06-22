//|===================================================|
//| COLLECTION ~ ITEM
//|===================================================|
define([
  'underscore-extended',
  'backbone-extended',
  'sampleton/templates/templates.row.model'
], function(_, Backbone, templateModel){

  return Backbone.Collection.extend({

    model: templateModel,

    url: '/api/templates'

  });
});