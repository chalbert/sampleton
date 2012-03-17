//|===================================================|
//| COLLECTION ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'sampleton/templates/templates.row.model'
], function(_, Backbone, templateModel){

  return Backbone.Collection.extend({

    model: templateModel,

    url: '/api/templates'

  });
});